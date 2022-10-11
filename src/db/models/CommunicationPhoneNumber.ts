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
import type { CommunicationType } from "./CommunicationType";
import type { CommunicationTerminalEquipmentType } from "./CommunicationTerminalEquipment";
const debug = debugModule("DB:CommunicationPhoneNumber");

export class CommunicationPhoneNumber extends Model<
  InferAttributes<CommunicationPhoneNumber>,
  InferCreationAttributes<CommunicationPhoneNumber>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare communicationTypeId: ForeignKey<CommunicationType["id"]>;
  declare communicationTerminalEquipmentId: ForeignKey<
    CommunicationTerminalEquipmentType["id"]
  >;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const CommunicationPhoneNumberFactory = (sequelize: Sequelize) => {
  debug("init CommunicationType model");

  return CommunicationPhoneNumber.init(
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
};
