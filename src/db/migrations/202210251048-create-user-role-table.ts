import { DataTypes, QueryInterface } from "sequelize";

import { UserRoles } from "../../types";
import { UserRole } from "../models/UserRole";

const TABLE_NAME = "user_role";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<UserRole>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(UserRoles),
        unique: true,
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
