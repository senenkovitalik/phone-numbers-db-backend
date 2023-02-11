import _ from "lodash";
import { Location, LocationsSubscribers, Subscriber } from "../../../db/models";
import {
  MutationInsert_Subscribers_OneArgs,
  MutationUpdate_Subscribers_By_PkArgs,
  MutationDelete_SubscribersArgs,
  AffectedRows,
} from "../../__generated/graphql";

export const update_subscribers_by_pk = async (
  _parent: unknown,
  { id: subscriberId, data }: MutationUpdate_Subscribers_By_PkArgs
): Promise<Subscriber> => {
  try {
    const oldSubscriberLocations = (
      await LocationsSubscribers.findAll({
        attributes: ["locationId"],
        where: {
          subscriberId,
        },
      })
    ).map((item) => item.get("locationId"));

    const { locations, ...rest } = data;

    const toAdd = _.difference(locations, oldSubscriberLocations);
    const toRemove = _.difference(oldSubscriberLocations, locations);

    if (toAdd.length !== 0) {
      await LocationsSubscribers.bulkCreate(
        toAdd.map((locationId) => ({
          locationId,
          subscriberId,
        }))
      );
    }

    if (toRemove.length !== 0) {
      await LocationsSubscribers.destroy({
        where: {
          subscriberId,
          locationId: toRemove,
        },
      });
    }

    await Subscriber.update(rest, {
      where: {
        id: subscriberId,
      },
    });

    return (await Subscriber.findByPk(subscriberId, {
      include: { model: Location, as: "locations" },
    })) as Subscriber;
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
    const { locations, ...rest } = data;

    const newSubscriber = await Subscriber.create(rest);
    const subscriberId = newSubscriber.get("id");

    if (locations.length !== 0) {
      await LocationsSubscribers.bulkCreate(
        locations.map((locationId) => ({
          subscriberId,
          locationId,
        }))
      );
    }

    return (await Subscriber.findByPk(subscriberId, {
      include: { model: Location, as: "locations" },
    })) as Subscriber;
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

interface ID {
  id: number;
}

export const delete_subscribers_by_pk = async (
  _parent: unknown,
  { id }: ID
): Promise<Subscriber> => {
  try {
    const subscriber = await Subscriber.findByPk(id);

    if (subscriber === null) {
      throw new Error(`Subscriber ID=${id} not found. No rows affected.`);
    }

    await Subscriber.destroy({ where: { id } });

    await LocationsSubscribers.destroy({
      where: {
        subscriberId: subscriber.get("id"),
      },
    });

    // add locations prop cause graphql want it, get an error otherwise
    subscriber.locations = [];

    return subscriber;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const delete_subscribers = async (
  _parent: unknown,
  { where: { ids } }: MutationDelete_SubscribersArgs
): Promise<AffectedRows> => {
  try {
    const count = await Subscriber.destroy({ where: { id: ids } });

    await LocationsSubscribers.destroy({ where: { subscriberId: ids } });

    return {
      affected_rows: count,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
