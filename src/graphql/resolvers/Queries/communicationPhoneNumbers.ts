import { Model, Op, Sequelize, Utils } from "sequelize";
import _ from "lodash";
import {
  Communication,
  CommunicationPhoneNumber,
  Location,
  Subscriber,
} from "../../../db/models";
import {
  Aggregate,
  FilterString,
  InputMaybe,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
  QueryCommunication_Phone_Numbers_By_PkArgs,
} from "../../__generated/graphql";
import { OptionsType, CalcOptsI } from "../types";
import { calculateOptions } from "../utils";

interface FullSearchIds {
  phoneNumbersIds: number[];
  communicationTypeIds: number[];
  locationIds: number[];
  subscriberIds: number[];
}

const getIdsForFulltextSearch = async (
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

const getIdPredicate = (item: Model) => item.get("id") as number;

const buildOpts = (
  args: CalcOptsI,
  attributes: Record<string, unknown>
): OptionsType => {
  const { where, ...rest } = calculateOptions(args);

  return {
    where: where ? Object.assign(attributes, where) : {},
    ...rest,
  };
};

const getCommunicationIncludeOpts = (ids: FullSearchIds | null) => {
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

const getLocationIncludeOpts = (ids: FullSearchIds | null) => {
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

const getSubscriberIncludeOpts = (
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
          `MATCH (${Subscriber.getFulltextIndexFields().join(
            ","
          )}) AGAINST ('${args._eq}*' IN BOOLEAN MODE)`
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

export const communication_phone_numbers = async (
  _parent: unknown,
  args: QueryCommunication_Phone_NumbersArgs
) => {
  try {
    const { where, ...restArgs } = args;

    let subscriberArgs: InputMaybe<FilterString> | undefined;
    let restWhereArgs;
    let fulltextSearchArg: InputMaybe<FilterString> | undefined;

    if (where) {
      const { subscriber, q, ...restWhere } = where;
      subscriberArgs = subscriber;
      restWhereArgs = restWhere;
      fulltextSearchArg = q ? q : null;
    }

    const ids =
      fulltextSearchArg && fulltextSearchArg._eq.length > 0
        ? await getIdsForFulltextSearch(fulltextSearchArg._eq)
        : null;

    const opts = buildOpts(
      {
        ...restArgs,
        where: {
          ...restWhereArgs,
        },
      },
      {
        ...(ids &&
          ids.phoneNumbersIds.length && {
            id: ids.phoneNumbersIds,
          }),
      }
    );

    return await CommunicationPhoneNumber.findAll({
      ...opts,
      include: [
        getCommunicationIncludeOpts(ids),
        getLocationIncludeOpts(ids),
        getSubscriberIncludeOpts(ids, subscriberArgs),
      ],
    });
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_phone_numbers_aggregate = async (
  _parent: unknown,
  args: QueryCommunication_Phone_Numbers_AggregateArgs
): Promise<Aggregate> => {
  try {
    const { where, ...restArgs } = args;

    let subscriberArgs: FilterString | undefined | null;
    let restWhereArgs;

    if (where) {
      const { subscriber, ...restWhere } = where;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      subscriberArgs = subscriber;
      restWhereArgs = restWhere;
    }

    const options = calculateOptions({
      ...restArgs,
      where: { ...restWhereArgs },
    });

    const count = await CommunicationPhoneNumber.count({
      ...options,
      include: [
        {
          model: Communication,
          as: "communicationType",
        },
        {
          model: Location,
          as: "location",
        },
        {
          model: Subscriber,
          as: "subscriber",
          where:
            subscriberArgs && subscriberArgs._eq
              ? Sequelize.literal(
                  `MATCH (${Subscriber.getFulltextIndexFields().join(
                    ","
                  )}) AGAINST ('${subscriberArgs._eq}*' IN BOOLEAN MODE)`
                )
              : {},
        },
      ],
    });

    return {
      aggregate: {
        count,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_phone_numbers_by_pk = async (
  _parent: unknown,
  { id }: QueryCommunication_Phone_Numbers_By_PkArgs
) => {
  try {
    return await CommunicationPhoneNumber.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
