import { QueryInterface, DataTypes } from "sequelize";
import type { CommunicationPhoneNumber } from "../models/CommunicationPhoneNumber";

const TABLE_NAME = "communication_phone_number";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<CommunicationPhoneNumber>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      communicationTypeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "communication_type_id",
        references: {
          model: "communication_type",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "location_id",
        references: {
          model: "location",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      subscriberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "subscriber_id",
        references: {
          model: "subscriber",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
