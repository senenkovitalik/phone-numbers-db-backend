import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";

import { sequelize } from "../index";
export class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  declare id: CreationOptional<number>;
  declare country: string;
  declare region?: string;
  declare district?: string;
  declare city?: string;
  declare street?: string;
  declare building?: string;
  declare section?: string;
  declare floor?: string;
  declare room?: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    building: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    floor: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    room: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "location",
    underscored: true
  }
);
