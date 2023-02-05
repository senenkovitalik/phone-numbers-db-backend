import {
  Aggregate,
  QuerySubscribersArgs,
  QuerySubscribers_AggregateArgs,
  QuerySubscribers_By_PkArgs,
} from "../../__generated/graphql";
import { Subscriber } from "../../../db/models/Subscriber";
import { calculateOptions } from "../utils";
import { Location } from "../../../db/models";

export const subscribers = async (
  _parent: unknown,
  args: QuerySubscribersArgs
) => {
  try {
    const options = calculateOptions({
      args,
      fulltextIndexFields: Subscriber.getFulltextIndexFields(),
    });

    return await Subscriber.findAll({
      ...options,
      include: { model: Location, as: "locations" },
    });
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
    const options = calculateOptions({
      args,
      fulltextIndexFields: Subscriber.getFulltextIndexFields(),
    });
    const count = await Subscriber.count(options);

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
    return await Subscriber.findByPk(id, {
      include: { model: Location, as: "locations" },
    });
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
