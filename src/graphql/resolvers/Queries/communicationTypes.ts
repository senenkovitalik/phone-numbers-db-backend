import { Communication } from "../../../db/models";
import {
  Aggregate,
  CommunicationType,
  QueryCommunication_TypesArgs,
  QueryCommunication_Types_AggregateArgs,
  QueryCommunication_Types_By_PkArgs,
} from "../../__generated/graphql";
import { calculateOptions } from "../utils";

export const communication_types = async (
  _parent: unknown,
  args: QueryCommunication_TypesArgs
): Promise<Communication[]> => {
  try {
    const options = calculateOptions(args);

    return await Communication.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_types_aggregate = async (
  _parent: unknown,
  args: QueryCommunication_Types_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = calculateOptions(args);

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
    return await Communication.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
