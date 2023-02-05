import {
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../index";

import type { Location } from "./Location";
import type { Subscriber } from "./Subscriber";

export class LocationsSubscribers extends Model<
  InferAttributes<LocationsSubscribers>,
  InferCreationAttributes<LocationsSubscribers>
> {
  declare subscriberId: ForeignKey<Subscriber["id"]>;
  declare locationId: ForeignKey<Location["id"]>;
}

LocationsSubscribers.init(
  {},
  {
    sequelize,
    tableName: "locations_subscribers",
    underscored: true,
    timestamps: false,
  }
);
