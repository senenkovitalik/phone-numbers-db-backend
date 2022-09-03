import express, { Express, Request, Response } from "express";

import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// import { Sequelize } from "sequelize";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

// const sequelize = new Sequelize(
//   "phones_handbook",
//   "armagedon",
//   "5ij9mN!C8d@E_aF",
//   {
//     host: "db4free.net",
//     port: 3306,
//     dialect: "mysql"
//   }
// );

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// (async () => {
//   try {
//     await sequelize.authenticate();
//     // @ts-ignore
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     // @ts-ignore
//     console.error("Unable to connect to the database:", error);
//   }
// })();

const app: Express = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpException, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
