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
import { CommunicationTerminalEquipment } from "./CommunicationTerminalEquipment";

export class CommunicationPhoneNumber extends Model<
  InferAttributes<CommunicationPhoneNumber>,
  InferCreationAttributes<CommunicationPhoneNumber>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare communicationTypeId: ForeignKey<Communication["id"]>;
  declare communicationTerminalEquipmentId: ForeignKey<
    CommunicationTerminalEquipment["id"]
  >;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CommunicationPhoneNumber.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
  }
);

CommunicationPhoneNumber.belongsTo(CommunicationTerminalEquipment);

CommunicationPhoneNumber.belongsTo(Communication);
