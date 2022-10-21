import { Sequelize } from "sequelize";
import type { Env } from "./config/types";
import Config = require("./config/config");

const env = (process.env["NODE_ENV"] || "development") as Env;
const config = Config[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
