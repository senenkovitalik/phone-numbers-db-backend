import { Communication } from "../../../db/models";
import { MutationInsert_Communication_Types_OneArgs } from "../../__generated/graphql";

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
