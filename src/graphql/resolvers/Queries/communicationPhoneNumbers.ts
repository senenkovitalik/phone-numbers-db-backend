import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_Phone_NumbersArgs,
} from "../../__generated/graphql";

export const communication_phone_numbers = async (
  _parent: unknown,
  { limit, offset }: QueryCommunication_Phone_NumbersArgs
): Promise<CommunicationPhoneNumber[]> => {
  try {
    const options: { limit?: number; offset?: number } = {};

    if (limit) {
      options.limit = limit;
    }

    if (offset) {
      options.offset = offset;
    }

    return await CommunicationPhoneNumber.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_phone_numbers_aggregate =
  async (): Promise<Aggregate> => {
    try {
      const count = await CommunicationPhoneNumber.count();

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
