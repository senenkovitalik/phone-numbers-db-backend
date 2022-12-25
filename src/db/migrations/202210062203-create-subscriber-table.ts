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
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'first_name'
      },
      middleName: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'middle_name'
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'last_name'
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
