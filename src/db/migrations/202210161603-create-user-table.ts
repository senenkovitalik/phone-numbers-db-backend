import { QueryInterface, DataTypes } from "sequelize";
import type { UserType } from "../models/User";

const TABLE_NAME = "user";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<UserType>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_admin",
      }
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
