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
        allowNull: false,
        field: "communication_type_id",
        references: {
          model: "communication_type",
          key: "id",
        },
      },
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "location_id",
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
