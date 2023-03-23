import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../index";
export class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
  declare country: CreationOptional<string | null>;
  declare region: CreationOptional<string | null>;
  declare district: CreationOptional<string | null>;
  declare city: CreationOptional<string | null>;
  declare street: CreationOptional<string | null>;
  declare building: CreationOptional<string | null>;
  declare section: CreationOptional<string | null>;
  declare floor: CreationOptional<string | null>;
  declare room: CreationOptional<string | null>;
  declare parentId: ForeignKey<Location["id"]> | null;
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
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING(6),
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
    parentId: {
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
    tableName: "location",
    underscored: true,
    validate: {
      nameOrParentId() {
        if (!this["name"] && !this["parentId"]) {
          throw new Error("name or parent must be provided.");
        }
      },
    },
  }
);
