import _ from "lodash";
import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
  QueryCommunication_Phone_Numbers_By_PkArgs,
} from "../../__generated/graphql";
import {
  calculateOptions_NEW,
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
    const restWhereArgs = where && _.omit(where, ["subscriber", "q"]);

    const idsForFulltextSearch =
      where && where.q && where.q._eq.length > 0
        ? await getIdsForFulltextSearch(where.q._eq)
        : null;

    const { where: whereValue, ...rest } = calculateOptions_NEW({
      args: {
        ...restArgs,
        where: {
          ...restWhereArgs,
        },
      },
      model: CommunicationPhoneNumber,
    });

    const opts = {
      ...(whereValue && {
        where: Object.assign(
          {
            ...(idsForFulltextSearch &&
              idsForFulltextSearch.phoneNumbersIds.length && {
                id: idsForFulltextSearch.phoneNumbersIds,
              }),
          },
          whereValue
        ),
      }),
      ...rest,
    };

    return await CommunicationPhoneNumber.findAll({
      ...opts,
      include: [
        getCommunicationIncludeOpts(idsForFulltextSearch?.communicationTypeIds),
        getLocationIncludeOpts(idsForFulltextSearch?.locationIds),
        getSubscriberIncludeOpts({
          args: where?.subscriber,
          ids: idsForFulltextSearch?.subscriberIds,
        }),
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
    const restWhereArgs = where && _.omit(where, ["subscriber", "q"]);

    const idsForFulltextSearch =
      where && where.q && where.q._eq.length > 0
        ? await getIdsForFulltextSearch(where.q._eq)
        : null;

    const { where: whereValue, ...rest } = calculateOptions_NEW({
      args: {
        ...restArgs,
        where: {
          ...restWhereArgs,
        },
      },
      model: CommunicationPhoneNumber,
    });

    const opts = {
      ...(whereValue && {
        where: Object.assign(
          {
            ...(idsForFulltextSearch &&
              idsForFulltextSearch.phoneNumbersIds.length && {
                id: idsForFulltextSearch.phoneNumbersIds,
              }),
          },
          whereValue
        ),
      }),
      ...rest,
    };

    const count = await CommunicationPhoneNumber.count({
      ...opts,
      include: [
        getCommunicationIncludeOpts(idsForFulltextSearch?.communicationTypeIds),
        getLocationIncludeOpts(idsForFulltextSearch?.locationIds),
        getSubscriberIncludeOpts({
          args: where?.subscriber,
          ids: idsForFulltextSearch?.subscriberIds,
        }),
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
