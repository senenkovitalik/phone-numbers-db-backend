import { QueryInterface, DataTypes } from "sequelize";
import type { LocationsSubscribersType } from "../models/LocationsSubscribers";

const TABLE_NAME = "locations_subscribers";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<LocationsSubscribersType>(TABLE_NAME, {
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
