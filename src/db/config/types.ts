import type { Dialect } from "sequelize";

type ConfigFields = {
  username: string;
  password?: string;
  database: string;
  host: string;
  port?: number;
  dialect: Dialect;
};

export type Env = "development" | "test" | "production";

export type ConfigType = {
  [key in Env]: ConfigFields;
};
