import { DataTypes, QueryInterface } from "sequelize";
import type { Communication } from "../models/Communication";

const TABLE_NAME = "communication_type";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Communication>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
