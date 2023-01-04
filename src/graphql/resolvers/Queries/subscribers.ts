import {
  Aggregate,
  QuerySubscribersArgs,
  QuerySubscribers_By_PkArgs,
} from "../../__generated/graphql";
import { Subscriber } from "../../../db/models/Subscriber";
import { InferAttributes, Order, WhereOptions } from "sequelize";

export const subscribers = async (
  _parent: unknown,
  { limit, offset, where }: QuerySubscribersArgs
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
      ...(where && {
        where: Object.entries(where).reduce((accumulator, currentValue) => {
          const [key, value] = currentValue;
          return {
            ...accumulator,
            [key]: value?._eq,
          };
        }, {}),
      }),
    };

    console.log(options);

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
