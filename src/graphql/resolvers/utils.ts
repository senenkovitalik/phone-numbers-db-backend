import { Model, Op, Sequelize, Utils } from "sequelize";
import _ from "lodash";
import {
  Communication,
  CommunicationPhoneNumber,
  Location,
  Subscriber,
} from "../../db/models";
import { FilterId, FilterString, InputMaybe } from "../__generated/graphql";
import { CalcOptsI, FullSearchIds, OptionsType, WhereOptsI } from "./types";

const isEmptyObject = (obj: unknown = {}) => {
  return (
    !!obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const processWhereArgs = (
  where: WhereOptsI,
  fulltextIndexFields?: string[]
) => {
  return Object.entries(where).reduce((accumulator, currentValue) => {
    const [key, value] = currentValue;

    if (key === "id" && value) {
      return {
        ...accumulator,
        [key]: [
          ...((value as FilterId)._eq ? [(value as FilterId)._eq] : []),
          ...(Array.isArray((value as FilterId)._in)
            ? ((value as FilterId)._in as [])
            : []),
        ],
      };
    }

    // fulltext search
    if (
      key === "q" &&
      value &&
      typeof value._eq === "string" &&
      fulltextIndexFields
    ) {
      return {
        ...accumulator,
        [key]: Sequelize.literal(
          `MATCH (${fulltextIndexFields.join(",")}) AGAINST ('${
            value._eq
          }*' IN BOOLEAN MODE)`
        ),
      };
    }

    // find text values using LIKE %query_value%
    if (typeof value?._eq === "string") {
      return {
        ...accumulator,
        [key]: {
          [Op.like]: `%${value?._eq ? value?._eq : ""}%`,
        },
      };
    }

    return {
      ...accumulator,
      [key]: value?._eq,
    };
  }, {});
};

export function calculateOptions(
  { limit, offset, order_by, where }: CalcOptsI,
  fulltextIndexFields?: string[]
): OptionsType {
  let whereClauseObj: { [key: string]: unknown } & { q?: Utils.Literal } = {};
  let whereClause = {};

  if (where) {
    whereClauseObj = processWhereArgs(where, fulltextIndexFields);

    const { q, ...rest } = whereClauseObj;

    const isFulltextArgEmpty = isEmptyObject(q);
    const isRestArgsEmpty = isEmptyObject(rest);

    if (!isFulltextArgEmpty && !isRestArgsEmpty) {
      whereClause = {
        [Op.and]: [rest, Sequelize.where(q as Utils.Literal, Op.not, null)],
      };
    } else if (isFulltextArgEmpty && !isRestArgsEmpty) {
      whereClause = rest;
    } else if (!isFulltextArgEmpty && isRestArgsEmpty) {
      whereClause = q as Utils.Literal;
    }
  }

  return {
    ...(limit && { limit }),
    ...(offset && { offset }),
    ...(order_by && { order: Object.entries(order_by as object) }),
    ...(whereClause && {
      where: whereClause,
    }),
  };
}

export const getIdsForFulltextSearch = async (
  fulltextSearchValue: string
): Promise<FullSearchIds> => {
  if (fulltextSearchValue.length === 0) {
    throw new Error("Search value must have at least one character");
  }

  const phoneNumbersIds = (
    await CommunicationPhoneNumber.findAll({
      where: {
        value: {
          [Op.like]: `%${fulltextSearchValue}%`,
        },
      },
      attributes: ["id"],
    })
  ).map(getIdPredicate);

  const communicationTypeIds = (
    await Communication.findAll({
      where: {
        value: {
          [Op.like]: `%${fulltextSearchValue}%`,
        },
      },
      attributes: ["id"],
    })
  ).map(getIdPredicate);

  const locationIds = (
    await Location.findAll({
      where: {
        name: {
          [Op.like]: `%${fulltextSearchValue}%`,
        },
      },
      attributes: ["id"],
    })
  ).map(getIdPredicate);

  const subscriberIds = (
    await Subscriber.findAll({
      where: fulltextSearchValue
        ? Sequelize.literal(
            `MATCH (${Subscriber.getFulltextIndexFields().join(
              ","
            )}) AGAINST ('${fulltextSearchValue}*' IN BOOLEAN MODE)`
          )
        : {},
      attributes: ["id"],
    })
  ).map(getIdPredicate);

  return {
    phoneNumbersIds,
    communicationTypeIds,
    locationIds,
    subscriberIds,
  };
};

export const getIdPredicate = (item: Model) => item.get("id") as number;

export const buildOpts = (
  args: CalcOptsI,
  attributes: Record<string, unknown>
): OptionsType => {
  const { where, ...rest } = calculateOptions(args);

  return {
    where: where ? Object.assign(attributes, where) : {},
    ...rest,
  };
};

export const getCommunicationIncludeOpts = (ids: FullSearchIds | null) => {
  return {
    model: Communication,
    as: "communicationType",
    ...(ids &&
      ids.communicationTypeIds.length && {
        where: {
          id: ids.communicationTypeIds,
        },
      }),
  };
};

export const getLocationIncludeOpts = (ids: FullSearchIds | null) => {
  return {
    model: Location,
    as: "location",
    ...(ids &&
      ids.locationIds.length && {
        where: {
          id: ids.locationIds,
        },
      }),
  };
};

export const getSubscriberIncludeOpts = (
  ids: InputMaybe<FullSearchIds>,
  args?: InputMaybe<FilterString>
) => {
  const globalSearchOpts =
    ids && ids.subscriberIds.length
      ? {
          id: ids.subscriberIds,
        }
      : null;

  const localSearchOpts =
    args && args._eq
      ? Sequelize.literal(
          `MATCH (${Subscriber.getFulltextIndexFields().join(",")}) AGAINST ('${
            args._eq
          }*' IN BOOLEAN MODE)`
        )
      : null;

  const optsCollection = [globalSearchOpts, localSearchOpts];
  const predicate = (item: unknown) => item !== null;

  const isWhereExist = _.some(optsCollection, predicate);
  const isAndOpExist = _.every(optsCollection, predicate);

  let whereOpts = {};

  if (isAndOpExist) {
    whereOpts = {
      [Op.and]: [
        globalSearchOpts,
        Sequelize.where(localSearchOpts as Utils.Literal, Op.not, null),
      ],
    };
  } else if (globalSearchOpts) {
    whereOpts = globalSearchOpts;
  } else if (localSearchOpts) {
    whereOpts = localSearchOpts;
  }

  return {
    model: Subscriber,
    as: "subscriber",
    ...(isWhereExist && {
      where: whereOpts,
    }),
  };
};
