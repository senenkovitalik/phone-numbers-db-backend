import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

import debugModule from "debug";

const debug = debugModule("DB:Location");

export class LocationType extends Model<
  InferAttributes<LocationType>,
  InferCreationAttributes<LocationType>
> {
  declare id: CreationOptional<number>;
  declare country: string;
  declare region: string;
  declare district: string;
  declare city: string;
  declare street: string;
  declare building: string;
  declare section: string;
  declare floor: string;
  declare room: string;
}

export const LocationFactory = (sequelize: Sequelize) => {
  debug("init Location model");

  return LocationType.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
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
    },
    {
      sequelize,
      tableName: "location",
    }
  );
};
