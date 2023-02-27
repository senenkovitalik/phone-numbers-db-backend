import _ from "lodash";
import {
  Aggregate,
  QueryHumansArgs,
  QuerySubscribers_AggregateArgs,
} from "../../__generated/graphql";
import { calculateOptions } from "../utils";
import { Human } from "../../../db/models";

export const humans = async (_parent: unknown, args: QueryHumansArgs) => {
  try {
    const options = calculateOptions({ args });

    const a = await Human.findAll({
      ...options,
    });

    return a;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const humans_aggregate = async (
  _parent: unknown,
  args: QuerySubscribers_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = calculateOptions({ args });

    const count = await Human.count({
      ...options,
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
