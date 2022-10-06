import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
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
          key: "id"
        }
      },
      subscriberId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Subscriber,
          key: "id"
        }
      },
    },
    {
      sequelize,
      tableName: "locations_subscribers",
      underscored: true
    }
  );
};
