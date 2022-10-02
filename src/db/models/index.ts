import { Sequelize } from "sequelize";
import { PhoneSystemTypeFactory } from "./PhoneSystemType";

import Config = require("../config/config");
import type { Env } from "../config/types";

const env = (process.env["NODE_ENV"] || "development") as Env;
const config = Config[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const PhoneSystemTypeModel = PhoneSystemTypeFactory(sequelize);
