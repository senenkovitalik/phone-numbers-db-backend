import { Subscriber } from "../../../db/models";
import { MutationUpdate_Subscribers_By_PkArgs } from "../../__generated/graphql";

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
