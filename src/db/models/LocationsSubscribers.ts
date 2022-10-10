import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
  CreationOptional,
} from "sequelize";

import debugModule from "debug";
import { Location, Subscriber } from ".";

const debug = debugModule("DB:LocationSubscriber");

export class LocationsSubscribersType extends Model<
  InferAttributes<LocationsSubscribersType>,
  InferCreationAttributes<LocationsSubscribersType>
> {
  declare subscriberId: number;
  declare locationId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const LocationsSubscribersFactory = (sequelize: Sequelize) => {
  debug("init LocationSubscriber model");

  return LocationsSubscribersType.init(
    {
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Location,
          key: "id",
        },
      },
      subscriberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Subscriber,
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "locations_subscribers",
      underscored: true,
    }
  );
};
