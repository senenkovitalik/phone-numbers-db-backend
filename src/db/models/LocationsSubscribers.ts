import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";

import { sequelize } from "./index";

import type { Location } from "./Location";
import type { Subscriber } from "./Subscriber";

export class LocationsSubscribers extends Model<
  InferAttributes<LocationsSubscribers>,
  InferCreationAttributes<LocationsSubscribers>
> {
  declare subscriberId: ForeignKey<Subscriber["id"]>;
  declare locationId: ForeignKey<Location["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

LocationsSubscribers.init(
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
