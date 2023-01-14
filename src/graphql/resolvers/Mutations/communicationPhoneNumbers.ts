import { CommunicationPhoneNumber } from "../../../db/models";
import {
  AffectedRows,
  MutationDelete_Communication_Phone_NumbersArgs,
  MutationDelete_Communication_Phone_Numbers_By_PkArgs,
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

export const delete_communication_phone_numbers_by_pk = async (
  _parent: unknown,
  { id }: MutationDelete_Communication_Phone_Numbers_By_PkArgs
): Promise<CommunicationPhoneNumber> => {
  try {
    const res = await CommunicationPhoneNumber.findByPk(id);

    if (res === null) {
      throw new Error(`CommunicationPhoneNumber ID=${id} not found`);
    }

    const count = await CommunicationPhoneNumber.destroy({ where: { id } });

    if (count === 0) {
      throw new Error(
        `Some error happend during deleting CommunicationPhoneNumber ID=${id}.`
      );
    }

    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const delete_communication_phone_numbers = async (
  _parent: unknown,
  { where: { ids } }: MutationDelete_Communication_Phone_NumbersArgs
): Promise<AffectedRows> => {
  try {
    const count = await CommunicationPhoneNumber.destroy({
      where: { id: ids },
    });

    return {
      affected_rows: count,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
