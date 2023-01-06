import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
} from "../../__generated/graphql";
import { calculateOptions } from "../utils";

export const communication_phone_numbers = async (
  _parent: unknown,
  args: QueryCommunication_Phone_NumbersArgs
): Promise<CommunicationPhoneNumber[]> => {
  try {
    const options = calculateOptions(args);

    return await CommunicationPhoneNumber.findAll(options);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const communication_phone_numbers_aggregate = async (
  _parent: unknown,
  args: QueryCommunication_Phone_Numbers_AggregateArgs
): Promise<Aggregate> => {
  try {
    const options = calculateOptions(args);

    const { count } = await CommunicationPhoneNumber.findAndCountAll(options);

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
