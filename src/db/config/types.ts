import type { Dialect } from "sequelize";

type ConfigFields = {
  username: string;
  password?: string;
  database: string;
  host: string;
  port?: number;
  dialect: Dialect;
  migrationStorageTableName?: string;
  seederStorageTableName?: string;
  logging?: boolean;
};

export type Env = "development" | "test" | "production";

export type ConfigType = {
  [key in Env]: ConfigFields;
};
