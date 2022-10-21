import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";

import { sequelize } from "../index";

import { Communication } from "./Communication";
import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { Location } from "./Location";

export class CommunicationTerminalEquipment extends Model<
  InferAttributes<CommunicationTerminalEquipment>,
  InferCreationAttributes<CommunicationTerminalEquipment>
> {
  declare id: CreationOptional<number>;
  declare manufacturer: string | null;
  declare model: string | null;
  declare serialNumber: string | null;
  declare description: string | null;
  declare locationId: ForeignKey<Location["id"]>;
  declare communicationTypeId: ForeignKey<Communication["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CommunicationTerminalEquipment.init(
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

CommunicationTerminalEquipment.belongsTo(Location);

CommunicationTerminalEquipment.belongsTo(Communication);

CommunicationTerminalEquipment.hasMany(CommunicationPhoneNumber);
