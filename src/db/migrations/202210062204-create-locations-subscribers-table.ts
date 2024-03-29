import { DataTypes, QueryInterface } from "sequelize";
import type { LocationsSubscribers } from "../models/LocationsSubscribers";

const TABLE_NAME = "locations_subscribers";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<LocationsSubscribers>(TABLE_NAME, {
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "location_id",
        references: {
          model: "location",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      subscriberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "subscriber_id",
        references: {
          model: "subscriber",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
