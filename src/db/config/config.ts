import type { ConfigType } from "./types";

const Config: ConfigType = {
  development: {
    username: process.env["MYSQL_USER"] || "",
    password: process.env["MYSQL_PASSWORD"] || "",
    database: process.env["MYSQL_DB"] || "",
    host: process.env["MYSQL_HOST"] || "127.0.0.1",
    port: 3306,
    dialect: "mysql",
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