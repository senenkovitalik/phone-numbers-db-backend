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
  declare name: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare country: CreationOptional<string>;
  declare region: CreationOptional<string>;
  declare district: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare street: CreationOptional<string>;
  declare building: CreationOptional<string>;
  declare section: CreationOptional<string>;
  declare floor: CreationOptional<string>;
  declare room: CreationOptional<string>;
  declare parentId: CreationOptional<ForeignKey<Location["id"]>>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

/*
There sre two types of location - parent and child.
Parent location may have many child locations.
Child locations have only one parent location.
Parent location must be created with name attribute, parentId attr is equal to null.
Child locaton have no name, but parentId attribute must be set. 
*/
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
        if (this["name"] && this["parentId"]) {
          throw new Error(
            "Location model must have name eiter parentId attributes, not both."
          );
        }
      },
    },
  }
);
