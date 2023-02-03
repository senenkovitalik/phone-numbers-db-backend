import {
  Aggregate,
  QueryLocationsArgs,
  QueryLocations_AggregateArgs,
  QueryLocations_By_PkArgs,
} from "../../__generated/graphql";
import { Location } from "../../../db/models";
import { calculateOptions } from "../utils";

export const locations = async (_parent: unknown, args: QueryLocationsArgs) => {
  try {
    const options = calculateOptions({ args });

    return await Location.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const locations_aggregate = async (
  _parent: unknown,
  args: QueryLocations_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = calculateOptions({ args });

    const { count } = await Location.findAndCountAll(options);

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

export const locations_by_pk = async (
  _parent: unknown,
  { id }: QueryLocations_By_PkArgs
) => {
  try {
    return await Location.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
