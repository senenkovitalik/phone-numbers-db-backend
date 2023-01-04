import { WhereOptions, InferAttributes } from "sequelize";
import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
} from "../../__generated/graphql";

export const communication_phone_numbers = async (
  _parent: unknown,
  { limit, offset, where }: QueryCommunication_Phone_NumbersArgs
): Promise<CommunicationPhoneNumber[]> => {
  try {
    const options: {
      limit?: number;
      offset?: number;
      where?: WhereOptions<
        InferAttributes<
          CommunicationPhoneNumber,
          {
            omit: never;
          }
        >
      >;
    } = {
      limit: 10,
      offset: 0,
      where: {},
    };

    if (limit) {
      options.limit = limit;
    }

    if (offset) {
      options.offset = offset;
    }

    if (where) {
      const { id, value } = where;

      if (id) {
        if (id._in || id._eq) {
          options.where = {
            id: (id._in || id._eq) as number | number[],
          };
        }
      }

      if (value) {
        if (value._eq) {
          options.where = {
            value: value._eq,
          };
        }
      }
    }

    return await CommunicationPhoneNumber.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_phone_numbers_aggregate = async (
  _parent: unknown,
  { where }: QueryCommunication_Phone_Numbers_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = {
      where: {},
    };

    if (where) {
      const { id } = where;

      if (id?._in) {
        options.where = {
          id: id._in,
        };
      }
    }

    const res = await CommunicationPhoneNumber.findAll(options);

    return {
      aggregate: {
        count: res.length,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
