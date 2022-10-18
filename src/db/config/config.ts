import type { Dialect } from "sequelize/types";
import type { ConfigType } from "./types";

import * as dotenv from 'dotenv';
dotenv.config()

const Config: ConfigType = {
  development: {
    username: process.env["DB_USER"] as string,
    password: process.env["DB_PASSWORD"] as string,
    database: process.env["DB_NAME"] as string,
    host: process.env["DB_HOST"] as string,
    port: process.env["DB_PORT"] as unknown as number,
    dialect: process.env["DB_DIALECT"] as Dialect,
    migrationStorageTableName: "SEQUELIZE_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "SEQUELIZE_seeders",
    logging: true,
  },
  test: {
    username: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

/*
  Don't chnage this line!!!
  Sequelize CLI expects only this way export
*/
export = Config;
