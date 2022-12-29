import { Communication } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_TypesArgs,
} from "../../__generated/graphql";

export const communication_types = async (
  _parent: unknown,
  { limit, offset }: QueryCommunication_TypesArgs
): Promise<Communication[]> => {
  try {
    const options: { limit?: number; offset?: number } = {};

    if (limit) {
      options.limit = limit;
    }

    if (offset) {
      options.offset = offset;
    }

    const communicationTypes = await Communication.findAll(options);

    console.log(communicationTypes);

    return communicationTypes;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_types_aggregate = async (): Promise<Aggregate> => {
  try {
    const count = await Communication.count();

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
