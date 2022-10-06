import { QueryInterface, DataTypes } from "sequelize";
import { Location, Subscriber } from "../models";
import type { LocationsSubscribersType } from "../models/LocationsSubscribers";

const TABLE_NAME = "locations_subscribers";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<LocationsSubscribersType>(TABLE_NAME, {
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Location,
          key: "id",
        },
      },
      subscriberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Subscriber,
          key: "id",
        },
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
