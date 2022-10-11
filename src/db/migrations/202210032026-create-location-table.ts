import { QueryInterface, DataTypes } from "sequelize";
import type { LocationType } from "../models/Location";

const TABLE_NAME = "location";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<LocationType>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      building: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      section: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      floor: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      room: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
