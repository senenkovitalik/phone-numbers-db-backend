import _ from "lodash";
import { sequelize } from "../../../db";
import { Human, Location, LocationsSubscribers, Subscriber } from "../../../db/models";
import {
  MutationInsert_Subscribers_OneArgs,
  MutationUpdate_Subscribers_By_PkArgs,
  MutationDelete_SubscribersArgs,
  AffectedRows,
  MutationDelete_Subscribers_By_PkArgs,
} from "../../__generated/graphql";

export const update_subscribers_by_pk = async (
  _parent: unknown,
  { id: subscriberId, data }: MutationUpdate_Subscribers_By_PkArgs
): Promise<Subscriber> => {
  try {
    // get subscriber<->location pairs
    const pairs = await LocationsSubscribers.findAll({
      where: { subscriberId },
    });

    await sequelize.transaction(async (transaction) => {
      // remove locations
      await Location.destroy({
        where: {
          id: pairs.map(({ locationId }) => locationId),
        },
        transaction,
      });

      // remove subscriber<->location pairs
      await LocationsSubscribers.destroy({
        where: {
          subscriberId,
        },
        transaction,
      });

      // update subscriber data
      const { locations, ...rest } = data;

      await Subscriber.update(rest, {
        where: {
          id: subscriberId,
        },
        transaction,
      });

      // if locations exist - create them
      if (locations) {
        const newLocations = await Promise.all(
          locations.map(
            async (location) => await Location.create(location, { transaction })
          )
        );

        // create subscriber<->location pairs
        await Promise.all(
          newLocations.map(
            async ({ id }) =>
              await LocationsSubscribers.create(
                {
                  locationId: id,
                  subscriberId,
                },
                { transaction }
              )
          )
        );
      }
    });

    return (await Subscriber.findByPk(subscriberId, {
      include: [
        {
          model: Human,
          as: "human",
        },
        {
          model: Location,
          as: "locations",
        },
      ],
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
    if (!data.humanId && !data.position) {
      throw new Error("humanId or position must be provided.");
    }

    const { locations, ...rest } = data;

    const subscriberId = await sequelize.transaction(async (transaction) => {
      const newSubscriber = await Subscriber.create(rest, {
        transaction,
      });

      const subscriberId = newSubscriber.get("id");

      if (locations && locations.length !== 0) {
        const newLocations = await Location.bulkCreate(locations, {
          transaction,
        });

        await LocationsSubscribers.bulkCreate(
          newLocations.map(({ id }) => ({
            subscriberId,
            locationId: id,
          })),
          { transaction }
        );
      }

      return subscriberId;
    });

    return (await Subscriber.findByPk(subscriberId, {
      include: { model: Location, as: "locations" },
    })) as Subscriber;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const delete_subscribers_by_pk = async (
  _parent: unknown,
  { id }: MutationDelete_Subscribers_By_PkArgs
): Promise<Subscriber> => {
  try {
    const subscriber = await Subscriber.findByPk(id);

    if (subscriber === null) {
      throw new Error(`Subscriber ID=${id} not found. No rows affected.`);
    }

    await sequelize.transaction(async (t) => {
      await Subscriber.destroy({ where: { id }, transaction: t });

      if (subscriber.locations && subscriber.locations.length > 0) {
        await Location.destroy({
          where: {
            id: subscriber.locations.map(({ id }) => id),
          },
          transaction: t,
        });
      }

      await LocationsSubscribers.destroy({
        where: {
          subscriberId: subscriber.get("id"),
        },
        transaction: t,
      });
    });

    // add locations prop cause graphql want it, get an error otherwise
    // FIX THIS
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
    const subscribers = await Subscriber.findAll({
      where: {
        id: ids,
      },
    });

    let affected_rows = 0;

    await Promise.all(
      subscribers.map(async ({ id, locations }) => {
        return await sequelize.transaction(async (t) => {
          await Subscriber.destroy({ where: { id }, transaction: t });

          if (locations && locations.length > 0) {
            await Location.destroy({
              where: {
                id: locations.map(({ id }) => id),
              },
              transaction: t,
            });

            await LocationsSubscribers.destroy({
              where: {
                subscriberId: id,
              },
              transaction: t,
            });
          }

          affected_rows++;
        });
      })
    );

    return {
      affected_rows,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
