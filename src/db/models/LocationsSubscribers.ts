import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
  CreationOptional,
  ForeignKey,
} from "sequelize";

import debugModule from "debug";
import type { LocationType } from "./Location";
import type { SubscriberType } from "./Subscriber";

const debug = debugModule("DB:LocationSubscriber");

export class LocationsSubscribersType extends Model<
  InferAttributes<LocationsSubscribersType>,
  InferCreationAttributes<LocationsSubscribersType>
> {
  declare subscriberId: ForeignKey<SubscriberType["id"]>;
  declare locationId: ForeignKey<LocationType["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const LocationsSubscribersFactory = (sequelize: Sequelize) => {
  debug("init LocationSubscriber model");

  return LocationsSubscribersType.init(
    {
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
