import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import type { Debugger } from "debug";
import debugModule from "debug";
import type { Server } from "http";
import jwt from "jsonwebtoken";

import { MyContext, UserPayload } from "./types";

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(
  error: NodeJS.ErrnoException,
  port: string | number | false,
  debug: Debugger
) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string"
      ? `Pipe ${port.toString()}`
      : `Port ${port.toString()}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      debug(bind + " requires elevated privileges");
      return process.exit(1);
    case "EADDRINUSE":
      debug(bind + " is already in use");
      return process.exit(1);
    default:
      throw error;
  }
}

function onListening(server: Server, debug: Debugger) {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? `pipe ${addr}`
      : `port ${addr !== null ? addr.port : ""}`;
  debug("🚀 Server ready at " + bind);
}

export const buildGraphQLContext: ContextFunction<
  [ExpressContextFunctionArgument],
  MyContext
  // eslint-disable-next-line @typescript-eslint/require-await
> = async ({ req }) => {
  const debug = debugModule("graphql:context-builder");

  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return {
      user: null,
    };
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env["JWT_PASSWORD"] as string
    ) as UserPayload;

    return {
      user: {
        id: decoded.userId,
        email: decoded.email,
      },
    };
  } catch (e) {
    debug(e);

    return {
      user: null,
    };
  }
};

export { normalizePort, onError, onListening };
