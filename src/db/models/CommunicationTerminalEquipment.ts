import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";

import debugModule from "debug";
import type { LocationType } from "./Location";
import type { CommunicationType } from "./CommunicationType";
const debug = debugModule("DB:CommunicationTerminalEquipmentType");

export class CommunicationTerminalEquipmentType extends Model<
  InferAttributes<CommunicationTerminalEquipmentType>,
  InferCreationAttributes<CommunicationTerminalEquipmentType>
> {
  declare id: CreationOptional<number>;
  declare manufacturer: string | null;
  declare model: string | null;
  declare serialNumber: string | null;
  declare description: string | null;
  declare locationId: ForeignKey<LocationType["id"]>
  declare communicationTypeId: ForeignKey<CommunicationType["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const CommunicationTerminalEquipmentTypeFactory = (sequelize: Sequelize) => {
  debug("init CommunicationTerminalEquipmentType model");

  return CommunicationTerminalEquipmentType.init(
    {
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
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      underscored: true,
      tableName: "communication_terminal_equiipment",
    }
  );
};
