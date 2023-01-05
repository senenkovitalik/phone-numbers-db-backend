import {
  Aggregate,
  FilterId,
  QuerySubscribersArgs,
  QuerySubscribers_By_PkArgs,
} from "../../__generated/graphql";
import { Subscriber } from "../../../db/models/Subscriber";
import { InferAttributes, Order, WhereOptions } from "sequelize";

const 

export const subscribers = async (
  _parent: unknown,
  { limit, offset, order_by, where }: QuerySubscribersArgs
) => {
  try {
    const options: {
      limit?: number;
      offset?: number;
      order?: Order;
      where?: WhereOptions<
        InferAttributes<
          Subscriber,
          {
            omit: never;
          }
        >
      >;
    } = {
      ...(limit && { limit }),
      ...(offset && { offset }),
      ...(order_by && { order: Object.entries(order_by as object) }),
      ...(where && {
        where: Object.entries(where).reduce((accumulator, currentValue) => {
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

          return {
            ...accumulator,
            [key]: value?._eq,
          };
        }, {}),
      }),
    };

    return await Subscriber.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const subscribers_aggregate = async (): Promise<Aggregate> => {
  try {
    const subscribersCount = await Subscriber.count();

    return {
      aggregate: {
        count: subscribersCount,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const subscribers_by_pk = async (
  _parent: unknown,
  { id }: QuerySubscribers_By_PkArgs
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await Subscriber.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
