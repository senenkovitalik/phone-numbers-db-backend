import { CommunicationPhoneNumber } from "../../../db/models";
import {
  MutationInsert_Communication_Phone_Numbers_OneArgs,
  MutationUpdate_Communication_Phone_Numbers_By_PkArgs,
} from "../../__generated/graphql";

export const update_communication_phone_numbers_by_pk = async (
  _parent: unknown,
  { id, data }: MutationUpdate_Communication_Phone_Numbers_By_PkArgs
) => {
  try {
    await CommunicationPhoneNumber.update(data, {
      where: {
        id,
      },
    });

    return (await CommunicationPhoneNumber.findByPk(
      id
    )) as CommunicationPhoneNumber;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const insert_communication_phone_numbers_one = async (
  _parent: unknown,
  { data }: MutationInsert_Communication_Phone_Numbers_OneArgs
) => {
  try {
    return await CommunicationPhoneNumber.create(
      data as CommunicationPhoneNumber
    );
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
