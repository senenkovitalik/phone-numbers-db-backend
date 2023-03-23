import { DataTypes, QueryInterface } from "sequelize";
import type { Location } from "../models/Location";

const TABLE_NAME = "location";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Location>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      section: {
        type: DataTypes.STRING(6),
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
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "parent_id",
        references: {
          model: "location",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
