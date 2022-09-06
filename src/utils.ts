import type { Server } from "http";
import type { Debugger } from "debug";

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
  debug("Listening on " + bind);
}

export { normalizePort, onError, onListening };
