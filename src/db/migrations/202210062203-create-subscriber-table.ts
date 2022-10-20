import { DataTypes, QueryInterface } from "sequelize";
import type { Subscriber } from "../models/Subscriber";

const TABLE_NAME = "subscriber";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Subscriber>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'first_name'
      },
      middlename: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'middle_name'
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'last_name'
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
