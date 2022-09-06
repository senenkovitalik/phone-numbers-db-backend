import app from "./app";
import http from "http";
import debugModule from "debug";
import { normalizePort, onError, onListening } from "./utils";

const debug = debugModule("sandbox:server");

const port = normalizePort(process.env["PORT"] || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", (error: NodeJS.ErrnoException) =>
  onError(error, port, debug)
);
server.on("listening", () => onListening(server, debug));
