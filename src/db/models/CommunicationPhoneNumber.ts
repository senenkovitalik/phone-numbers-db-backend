import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../index";

import { Communication } from "./Communication";
import { Location } from "./Location";
// import { Subscriber } from "./Subscriber";

export class CommunicationPhoneNumber extends Model<
  InferAttributes<CommunicationPhoneNumber>,
  InferCreationAttributes<CommunicationPhoneNumber>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare communicationTypeId: ForeignKey<Communication["id"]>;
  declare locationId: ForeignKey<Location["id"]> | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare communicationType: NonAttribute<Communication>;
  declare location?: NonAttribute<Location>;
  // declare subscriber?: NonAttribute<Subscriber> | null;

  declare static associations: {
    communicationType: Association<CommunicationPhoneNumber, Communication>;
    location: Association<CommunicationPhoneNumber, Location>;
    // subscriber: Association<CommunicationPhoneNumber, Subscriber>;
  };
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
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    locationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
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
    tableName: "communication_phone_number",
  }
);
