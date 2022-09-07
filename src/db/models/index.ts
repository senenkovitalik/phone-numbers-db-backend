import { Sequelize, Dialect } from "sequelize";
import { PhoneSystemTypeFactory } from "./PhoneSystemType";

type ConfigFields = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
};

const env = process.env["NODE_ENV"] || "development";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
const config: ConfigFields = require(__dirname + "/../config/config.json")[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const PhoneSystemTypeModel = PhoneSystemTypeFactory(sequelize);
