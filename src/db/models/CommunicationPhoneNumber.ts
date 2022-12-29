import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../index";

import { Communication } from "./Communication";
import { Location } from "./Location";

export class CommunicationPhoneNumber extends Model<
  InferAttributes<CommunicationPhoneNumber>,
  InferCreationAttributes<CommunicationPhoneNumber>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare communicationTypeId: ForeignKey<Communication["id"]>;
  declare locationId: ForeignKey<Location["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CommunicationPhoneNumber.init(
  {
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
      references: {
        model: "communication_type",
        key: "id",
      },
    },
    locationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "location",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    tableName: "communication_phone_number"
  }
);
