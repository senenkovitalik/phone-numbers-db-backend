import { DataTypes, QueryInterface } from "sequelize";
import type { CommunicationTerminalEquipment } from "../models/CommunicationTerminalEquipment";

const TABLE_NAME = "communication_terminal_equipment";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<CommunicationTerminalEquipment>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      model: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      serialNumber: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: "serial_number"
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "location_id",
        defaultValue: null,
        references: {
          model: "location",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      communicationTypeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: "communication_type_id",
        defaultValue: null,
        references: {
          model: "communication_type",
          key: "id",
        },
        onDelete: "SET NULL",
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
