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
  debug("🚀 Server ready at " + bind);
}

function underscore(str: string, all_upper_case: boolean): string {
  if (all_upper_case && str === str.toUpperCase()) return str;

  const uppercase = new RegExp("([A-Z])", "g");
  const underbar_prefix = new RegExp("^_");

  const str_path = str.split("::");
  let i = 0;
  const j = str_path.length;

  for (; i < j; i++) {
    str_path[i] = (str_path[i] || "").replace(uppercase, "_$1");
    str_path[i] = (str_path[i] || "").replace(underbar_prefix, "");
  }

  return str_path.join("/").toLowerCase();
}

function underscoreObjectFields(
  object: { [s: string]: unknown } | ArrayLike<unknown>
) {
  const newObj: { [key: string]: unknown } = {};

  const a: Array<[string, unknown]> = Object.entries(object).map(
    ([key, val]) => {
      return [underscore(key, false), val];
    }
  );

  a.forEach((item) => {
    const [key, value] = item;
    newObj[key] = value;
  });

  return newObj;
}

export { normalizePort, onError, onListening, underscoreObjectFields };
