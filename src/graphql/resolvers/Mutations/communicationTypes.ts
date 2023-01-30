import { Communication } from "../../../db/models";
import {
  MutationDelete_Communication_Types_By_PkArgs,
  MutationInsert_Communication_Types_OneArgs,
  MutationUpdate_Communication_Types_By_PkArgs,
} from "../../__generated/graphql";

export const insert_communication_types_one = async (
  _parent: unknown,
  { data }: MutationInsert_Communication_Types_OneArgs
) => {
  try {
    return await Communication.create(data);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const update_communication_types_by_pk = async (
  _parent: unknown,
  { id, data }: MutationUpdate_Communication_Types_By_PkArgs
) => {
  try {
    await Communication.update(data, {
      where: {
        id,
      },
    });

    return (await Communication.findByPk(id)) as Communication;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const delete_communication_types_by_pk = async (
  _parent: unknown,
  { id }: MutationDelete_Communication_Types_By_PkArgs
) => {
  try {
    const res = await Communication.findByPk(id);

    if (res === null) {
      throw new Error(`Subscriber ID=${id} not found. No rows affected.`);
    }

    await Communication.destroy({ where: { id } });

    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
