import { DataTypes, QueryInterface } from "sequelize";
import type { Subscriber } from "../models/Subscriber";

const TABLE_NAME = "subscriber";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Subscriber>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      humanId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "human_id",
        references: {
          model: "human",
          key: "id",
        },
      },
      position: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
