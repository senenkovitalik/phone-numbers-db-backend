import { Sequelize } from "sequelize";
import type { Env } from "../config/types";
import { Communication } from "./Communication";
import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { CommunicationTerminalEquipment } from "./CommunicationTerminalEquipment";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
import { Subscriber } from "./Subscriber";
import Config = require("../config/config");

const env = (process.env["NODE_ENV"] || "development") as Env;
const config = Config[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
Location.belongsToMany(Subscriber, { through: LocationsSubscribers });

Location.hasMany(CommunicationTerminalEquipment);
CommunicationTerminalEquipment.belongsTo(Location);

Communication.hasMany(CommunicationTerminalEquipment);
CommunicationTerminalEquipment.belongsTo(Communication);

CommunicationTerminalEquipment.hasMany(CommunicationPhoneNumber);
CommunicationPhoneNumber.belongsTo(CommunicationTerminalEquipment);

Communication.hasMany(CommunicationPhoneNumber);
CommunicationPhoneNumber.belongsTo(Communication);
