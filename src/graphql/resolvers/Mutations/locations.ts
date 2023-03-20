import { Location, LocationsSubscribers } from "../../../db/models";
import {
  AffectedRows,
  MutationDelete_LocationsArgs,
  MutationDelete_Locations_By_PkArgs,
  MutationInsert_Locations_OneArgs,
  MutationUpdate_Locations_By_PkArgs,
} from "../../__generated/graphql";

/*
  These resolvers operates only with parent locations.
  Location name must be provided for create/update operations.
*/

export const insert_locations_one = async (
  _parent: unknown,
  { data }: MutationInsert_Locations_OneArgs
): Promise<Location> => {
  try {
    if (!data.name || (data.name && data.name.length === 0)) {
      throw new Error("CREATE location: Location name must be provided.");
    }

    // location name must be unique
    const locations = await Location.findAll({
      attributes: ["name"],
      where: {
        name: data.name,
      },
    });

    // choose this way, cause DB engine use case insensitive collation
    if (locations.find(({ name }) => name === data.name)) {
      throw new Error(
        `CREATE location: Location with name ${data.name} already exist. Location name must be unique.`
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await Location.create(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const update_locations_by_pk = async (
  _parent: unknown,
  { id, data }: MutationUpdate_Locations_By_PkArgs
): Promise<Location> => {
  try {
    if (!data.name || (data.name && data.name.length === 0)) {
      throw new Error("CREATE location: Location name must be provided.");
    }

    // location name must be unique
    const locations = await Location.findAll({
      attributes: ["name"],
      where: {
        name: data.name,
      },
    });

    // choose this way, cause DB engine use case insensitive collation
    if (locations.find(({ name }) => name === data.name)) {
      throw new Error(
        `CREATE location: Location with name ${data.name} already exist. Location name must be unique.`
      );
    }

    // if no errors thrown - update location
    await Location.update(data, {
      where: {
        id,
      },
    });

    return (await Location.findByPk(id)) as Location;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const delete_locations_by_pk = async (
  _parent: unknown,
  { id }: MutationDelete_Locations_By_PkArgs
): Promise<Location> => {
  try {
    // get location
    const location = (await Location.findByPk(id)) as Location;

    // if parent location - check child locations
    if (location?.parentId === null) {
      const childsCount = await Location.count({
        where: {
          parentId: location.id,
        },
      });

      // if child locations exist - throw error
      if (childsCount > 0) {
        throw new Error(
          `DELETE location ID=${location.id}: Child locations exist - remove them first.`
        );
      }
    } else {
      // if child location - check subscribers
      const pairsCount = await LocationsSubscribers.count({
        where: {
          locationId: id,
        },
      });

      // if subscribers exists - throw error
      if (pairsCount > 0) {
        throw new Error(
          `DELETE location ID=${location.id}: Subscribers exist - unpair or remove them first.`
        );
      }
    }

    // no errors thrown - remove location
    await Location.destroy({
      where: {
        id,
      },
    });

    return location;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const delete_locations = async (
  _parent: unknown,
  { where: { ids } }: MutationDelete_LocationsArgs
): Promise<AffectedRows> => {
  try {
    let affected_rows = 0;

    await Promise.all(
      ids.map(async (id) => {
        // get location
        const location = (await Location.findByPk(id)) as Location;

        // if parent location - check child locations
        if (location?.parentId === null) {
          const childsCount = await Location.count({
            where: {
              parentId: location.id,
            },
          });

          // if child locations exist - throw error
          if (childsCount > 0) {
            throw new Error(
              `DELETE location ID=${location.id}: Child locations exist - remove them first.`
            );
          }
        } else {
          // if child location - check subscribers
          const pairsCount = await LocationsSubscribers.count({
            where: {
              locationId: id,
            },
          });

          // if subscribers exists - throw error
          if (pairsCount > 0) {
            throw new Error(
              `DELETE location ID=${location.id}: Subscribers exist - unpair or remove them first.`
            );
          }
        }

        // no errors thrown - remove location
        await Location.destroy({
          where: {
            id,
          },
        });

        affected_rows++;
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
