import { InferAttributes, WhereOptions } from "sequelize";
import { Communication, CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  CommunicationType,
  QueryCommunication_TypesArgs,
  QueryCommunication_Types_AggregateArgs,
  QueryCommunication_Types_By_PkArgs,
} from "../../__generated/graphql";

export const communication_types = async (
  _parent: unknown,
  { limit, offset, where }: QueryCommunication_TypesArgs
): Promise<Communication[]> => {
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
      const { id, value, description } = where;

      if (id) {
        if (id._in || id._eq) {
          options.where = {
            ...options.where,
            id: (id._in || id._eq) as number | number[],
          };
        }
      }

      if (value) {
        if (value._eq) {
          options.where = {
            ...options.where,
            value: value._eq,
          };
        }
      }

      if (description) {
        if (description._eq) {
          options.where = {
            ...options.where,
            value: description._eq,
          };
        }
      }
    }

    const communicationTypes = await Communication.findAll(options);

    return communicationTypes;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_types_aggregate = async (
  _parent: unknown,
  { where }: QueryCommunication_Types_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options: {
      where?: WhereOptions<
        InferAttributes<
          CommunicationPhoneNumber,
          {
            omit: never;
          }
        >
      >;
    } = {
      where: {},
    };

    if (where) {
      const { id, value, description } = where;

      if (id) {
        if (id._in || id._eq) {
          options.where = {
            ...options.where,
            id: (id._in || id._eq) as number | number[],
          };
        }
      }

      if (value) {
        if (value._eq) {
          options.where = {
            ...options.where,
            value: value._eq,
          };
        }
      }

      if (description) {
        if (description._eq) {
          options.where = {
            ...options.where,
            value: description._eq,
          };
        }
      }
    }

    const count = await Communication.findAndCountAll(options);

    return {
      aggregate: {
        count: count.count,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_types_by_pk = async (
  _parent: unknown,
  { id }: QueryCommunication_Types_By_PkArgs
): Promise<CommunicationType | null> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await Communication.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
