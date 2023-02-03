import {
  Association,
  Model,
  ModelStatic,
  Op,
  Order,
  Sequelize,
  Utils,
} from "sequelize";
import _ from "lodash";
import {
  Communication,
  CommunicationPhoneNumber,
  Location,
  Subscriber,
} from "../../db/models";
import { FilterId, FilterString } from "../__generated/graphql";
import {
  CalcOptsI,
  CalcOptsI_NEW,
  FullSearchIds,
  OptionsType,
  WhereOptsI,
} from "./types";

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

type OrderItemAssociation =
  | Association
  | ModelStatic<Model>
  | { model: ModelStatic<Model>; as: string }
  | string;

export interface CalculateOptionsI {
  args: CalcOptsI_NEW;
  fulltextIndexFields?: string[];
  model?: ModelStatic<any>;
}

/**
 * Calculate options for query.
 * @returns {OptionsType} Query options
 */
export function calculateOptions_NEW({
  args: { limit, offset, order_by, where },
  fulltextIndexFields,
  model,
}: CalculateOptionsI): OptionsType {
  let whereClauseObj: { [key: string]: unknown } & { q?: Utils.Literal } = {};
  let whereClause = {};
  const order: Order = [];

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

  if (order_by) {
    const { field, order: orderValue } = order_by;
    const splitted = field.split(".");

    if (splitted.length > 1) {
      const subModel = splitted[0] as string;
      const subModelField = splitted[1] as string;

      if (model && Object.hasOwnProperty.call(model, "associations")) {
        order.push([
          model.associations[subModel] as OrderItemAssociation,
          subModelField,
          orderValue,
        ]);
      } else {
        throw new Error("Model was not provided or no associations exist");
      }
    } else {
      order.push([field, orderValue]);
    }
  }

  return {
    ...(limit && { limit }),
    ...(offset && { offset }),
    ...(order && { order }),
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

export interface BuildOptsI {
  args: CalcOptsI_NEW;
  attributes: Record<string, unknown>;
  model?: ModelStatic<any>;
}

export const buildOpts_NEW = ({
  args,
  attributes,
  model,
}: BuildOptsI): OptionsType => {
  const { where, ...rest } = calculateOptions_NEW({
    args,
    ...(model && { model }),
  });

  return {
    where: where ? Object.assign(attributes, where) : {},
    ...rest,
  };
};

export const getCommunicationIncludeOpts = (ids?: number[]) => {
  return {
    model: Communication,
    as: "communicationType",
    ...(ids &&
      ids.length && {
        where: {
          id: ids,
        },
      }),
  };
};

export const getLocationIncludeOpts = (ids?: number[]) => {
  return {
    model: Location,
    as: "location",
    ...(ids &&
      ids.length && {
        where: {
          id: ids,
        },
      }),
  };
};

export interface GetSubscriberIncludeOptsI {
  args?: FilterString | null | undefined;
  ids?: number[] | undefined;
}

export const getSubscriberIncludeOpts = ({
  args,
  ids,
}: GetSubscriberIncludeOptsI) => {
  const globalSearchOpts =
    ids && ids.length
      ? {
          id: ids,
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
