import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  FilterString,
  InputMaybe,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
  QueryCommunication_Phone_Numbers_By_PkArgs,
} from "../../__generated/graphql";
import {
  buildOpts,
  buildOpts_NEW,
  getCommunicationIncludeOpts,
  getIdsForFulltextSearch,
  getLocationIncludeOpts,
  getSubscriberIncludeOpts,
} from "../utils";

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

    const opts = buildOpts_NEW({
      args: {
        ...restArgs,
        where: {
          ...restWhereArgs,
        },
      },
      attributes: {
        ...(ids &&
          ids.phoneNumbersIds.length && {
            id: ids.phoneNumbersIds,
          }),
      },
      model: CommunicationPhoneNumber
    });

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

    const count = await CommunicationPhoneNumber.count({
      ...opts,
      include: [
        getCommunicationIncludeOpts(ids),
        getLocationIncludeOpts(ids),
        getSubscriberIncludeOpts(ids, subscriberArgs),
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
