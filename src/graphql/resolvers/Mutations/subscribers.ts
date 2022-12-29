import { Subscriber } from "../../../db/models";
import { MutationInsert_Subscribers_OneArgs, MutationUpdate_Subscribers_By_PkArgs, Subscribers_Update_Input } from "../../__generated/graphql";

export const update_subscribers_by_pk = async (
  _parent: unknown,
  { id, data }: MutationUpdate_Subscribers_By_PkArgs
): Promise<Subscriber> => {
  try {
    await Subscriber.update(data, {
      where: {
        id,
      },
    });

    return (await Subscriber.findByPk(id)) as Subscriber;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const insert_subscribers_one = async (
  _parent: unknown,
  { data }: MutationInsert_Subscribers_OneArgs
): Promise<Subscriber> => {
  try {
    return await Subscriber.create(data as Subscribers_Update_Input);
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
