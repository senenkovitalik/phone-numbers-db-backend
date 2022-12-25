import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import debugModule from "debug";
import express, { Express, Request, Response } from "express";
import http from "http";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import { sequelize } from "./db";

import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

import type { HttpException, MyContext } from "./types";

import { buildGraphQLContext, normalizePort, onError, onListening } from "./utils";

const debug = debugModule("main");

const port = normalizePort(process.env["PORT"] || "3001");

async function startApolloServer() {
  try {
    await sequelize.authenticate();
    debug("Connection to DB has been established successfully.");
  } catch (error) {
    debug("Unable to connect to the database:", error);
  }

  const app: Express = express();

  const httpServer = http.createServer(app);

  httpServer.on("error", (error: NodeJS.ErrnoException) =>
    onError(error, port, debug)
  );

  httpServer.on("listening", () => onListening(httpServer, debug));

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

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

  app.use(
    "/graphql",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: buildGraphQLContext
    })
  );

  // catch 404 and forward to error handler
  app.use((_req: Request, _res: Response, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err: HttpException, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals["message"] = err.message;
    res.locals["error"] = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port }, resolve);
  });
}

startApolloServer().catch((e) => {
  console.error("Some error happens");
  console.error(e);
});
