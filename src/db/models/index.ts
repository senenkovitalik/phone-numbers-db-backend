import { Sequelize } from "sequelize";
import { SubscriberFactory } from "./Subscriber";

import Config = require("../config/config");
import type { Env } from "../config/types";
import { LocationFactory } from "./Location";
import { LocationsSubscribersFactory } from "./LocationsSubscribers";
import { CommunicationTypeFactory } from "./CommunicationType";

const env = (process.env["NODE_ENV"] || "development") as Env;
const config = Config[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const Subscriber = SubscriberFactory(sequelize);
export const Location = LocationFactory(sequelize);
export const LocationsSubscribers = LocationsSubscribersFactory(sequelize);
export const CommunicationTypeModel = CommunicationTypeFactory(sequelize);

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
Location.belongsToMany(Subscriber, { through: LocationsSubscribers });
