import {
  Aggregate,
  QuerySubscribersArgs,
  QuerySubscribers_AggregateArgs,
  QuerySubscribers_By_PkArgs,
} from "../../__generated/graphql";
import { Subscriber } from "../../../db/models/Subscriber";
import { calculateOptions } from "../utils";

export const subscribers = async (
  _parent: unknown,
  args: QuerySubscribersArgs
) => {
  try {
    const options = calculateOptions(args);

    return await Subscriber.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const subscribers_aggregate = async (
  _parent: unknown,
  args: QuerySubscribers_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = calculateOptions(args);

    const { count } = await Subscriber.findAndCountAll(options);
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
