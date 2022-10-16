import { Sequelize } from "sequelize";
import { SubscriberFactory } from "./Subscriber";
import Config = require("../config/config");
import type { Env } from "../config/types";
import { LocationFactory } from "./Location";
import { LocationsSubscribersFactory } from "./LocationsSubscribers";
import { CommunicationTypeFactory } from "./CommunicationType";
import { CommunicationTerminalEquipmentTypeFactory } from "./CommunicationTerminalEquipment";
import { CommunicationPhoneNumberFactory } from "./CommunicationPhoneNumber";
import { UserFactory } from "./User";

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
export const CommunicationTerminalEquipment =
  CommunicationTerminalEquipmentTypeFactory(sequelize);

export const CommunicationPhoneNumberModel =
  CommunicationPhoneNumberFactory(sequelize);

export const User = UserFactory(sequelize);  

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
Location.belongsToMany(Subscriber, { through: LocationsSubscribers });

Location.hasMany(CommunicationTerminalEquipment);
CommunicationTerminalEquipment.belongsTo(Location);

CommunicationTypeModel.hasMany(CommunicationTerminalEquipment);
CommunicationTerminalEquipment.belongsTo(CommunicationTypeModel);

CommunicationTerminalEquipment.hasMany(CommunicationPhoneNumberModel);
CommunicationPhoneNumberModel.belongsTo(CommunicationTerminalEquipment);

CommunicationTypeModel.hasMany(CommunicationPhoneNumberModel);
CommunicationPhoneNumberModel.belongsTo(CommunicationTypeModel);

Subscriber.hasOne(User);
User.belongsTo(Subscriber);
