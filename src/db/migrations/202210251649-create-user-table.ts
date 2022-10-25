import { DataTypes, QueryInterface } from "sequelize";
import { User } from "../models";

const TABLE_NAME = "user";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<User>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "user_role_id",
        allowNull: false,
        references: {
          model: "user_role",
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
