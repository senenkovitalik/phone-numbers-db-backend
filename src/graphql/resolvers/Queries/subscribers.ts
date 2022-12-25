import {
  Aggregate,
  QuerySubscribersArgs,
  QuerySubscribers_By_PkArgs,
} from "../../__generated/graphql";
import { Subscriber } from "../../../db/models/Subscriber";

export const subscribers = async (
  _parent: unknown,
  { limit, offset }: QuerySubscribersArgs
) => {
  try {
    const options: { limit?: number; offset?: number } = {};

    if (limit) {
      options.limit = limit;
    }

    if (offset) {
      options.offset = offset;
    }

    const subscribers = await Subscriber.findAll(options);

    return subscribers;
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
