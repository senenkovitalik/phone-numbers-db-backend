import { QueryInterface, DataTypes } from "sequelize";
import type { CommunicationPhoneNumber } from "../models/CommunicationPhoneNumber";

const TABLE_NAME = "communication_phone_number";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<CommunicationPhoneNumber>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      communicationTerminalEquipmentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "communication_terminal_equipment_id",
        references: {
          model: "communication_terminal_equipment",
          key: "id",
        },
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
