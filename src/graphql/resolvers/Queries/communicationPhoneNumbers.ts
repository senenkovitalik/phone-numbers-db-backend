import { CommunicationPhoneNumber } from "../../../db/models";
import {
  Aggregate,
  QueryCommunication_Phone_NumbersArgs,
  QueryCommunication_Phone_Numbers_AggregateArgs,
  QueryCommunication_Phone_Numbers_By_PkArgs,
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

export const communication_phone_numbers_by_pk = async (
  _parent: unknown,
  { id }: QueryCommunication_Phone_Numbers_By_PkArgs
) => {
  try {
    return await CommunicationPhoneNumber.findByPk(id);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
