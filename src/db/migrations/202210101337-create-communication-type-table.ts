import { QueryInterface, DataTypes } from "sequelize";
import type { CommunicationType } from "../models/CommunicationType";

const TABLE_NAME = "communication_type";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<CommunicationType>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "parent_id",
        defaultValue: null,
        references: {
          model: "communication_type",
          key: "id",
        },
        onDelete: "SET DEFAULT",
        onUpdate: "CASCADE",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
