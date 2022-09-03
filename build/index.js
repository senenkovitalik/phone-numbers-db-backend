/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ \"http-errors\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\nconst morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\n// import { Sequelize } from \"sequelize\";\nconst index_1 = __importDefault(__webpack_require__(/*! ./routes/index */ \"./src/routes/index.ts\"));\nconst users_1 = __importDefault(__webpack_require__(/*! ./routes/users */ \"./src/routes/users.ts\"));\n// const sequelize = new Sequelize(\n//   \"phones_handbook\",\n//   \"armagedon\",\n//   \"5ij9mN!C8d@E_aF\",\n//   {\n//     host: \"db4free.net\",\n//     port: 3306,\n//     dialect: \"mysql\"\n//   }\n// );\nclass HttpException extends Error {\n    constructor(status, message) {\n        super(message);\n        this.status = status;\n        this.message = message;\n    }\n}\n// (async () => {\n//   try {\n//     await sequelize.authenticate();\n//     // @ts-ignore\n//     console.log(\"Connection has been established successfully.\");\n//   } catch (error) {\n//     // @ts-ignore\n//     console.error(\"Unable to connect to the database:\", error);\n//   }\n// })();\nconst app = (0, express_1.default)();\n// view engine setup\napp.set(\"views\", path_1.default.join(__dirname, \"views\"));\napp.set(\"view engine\", \"jade\");\napp.use((0, morgan_1.default)(\"dev\"));\napp.use(express_1.default.json());\napp.use(express_1.default.urlencoded({ extended: false }));\napp.use((0, cookie_parser_1.default)());\napp.use(express_1.default.static(path_1.default.join(__dirname, \"public\")));\napp.use(\"/\", index_1.default);\napp.use(\"/users\", users_1.default);\n// catch 404 and forward to error handler\napp.use((req, res, next) => {\n    next((0, http_errors_1.default)(404));\n});\n// error handler\napp.use((err, req, res) => {\n    // set locals, only providing error in development\n    res.locals.message = err.message;\n    res.locals.error = req.app.get(\"env\") === \"development\" ? err : {};\n    // render the error page\n    res.status(err.status || 500);\n    res.render(\"error\");\n});\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://phone-numbers-db-backend/./src/app.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst app_1 = __importDefault(__webpack_require__(/*! ./app */ \"./src/app.ts\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst debug_1 = __importDefault(__webpack_require__(/*! debug */ \"debug\"));\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nconst debug = (0, debug_1.default)(\"sandbox:server\");\nconst port = (0, utils_1.normalizePort)(process.env.PORT || \"3000\");\napp_1.default.set(\"port\", port);\nconst server = http_1.default.createServer(app_1.default);\nserver.listen(port);\nserver.on(\"error\", (error) => (0, utils_1.onError)(error, port, debug));\nserver.on(\"listening\", () => (0, utils_1.onListening)(server, debug));\n\n\n//# sourceURL=webpack://phone-numbers-db-backend/./src/index.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst router = express_1.default.Router();\n/* GET home page. */\nrouter.get(\"/\", (req, res) => {\n    res.render(\"index\", { title: \"Express\" });\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://phone-numbers-db-backend/./src/routes/index.ts?");

/***/ }),

/***/ "./src/routes/users.ts":
/*!*****************************!*\
  !*** ./src/routes/users.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst router = express_1.default.Router();\n/* GET users listing. */\nrouter.get(\"/\", (req, res) => {\n    res.send(\"respond with a resource\");\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://phone-numbers-db-backend/./src/routes/users.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.onListening = exports.onError = exports.normalizePort = void 0;\nfunction normalizePort(val) {\n    const port = parseInt(val, 10);\n    if (isNaN(port)) {\n        // named pipe\n        return val;\n    }\n    if (port >= 0) {\n        // port number\n        return port;\n    }\n    return false;\n}\nexports.normalizePort = normalizePort;\nfunction onError(error, port, debug) {\n    if (error.syscall !== \"listen\") {\n        throw error;\n    }\n    const bind = typeof port === \"string\"\n        ? `Pipe ${port.toString()}`\n        : `Port ${port.toString()}`;\n    // handle specific listen errors with friendly messages\n    switch (error.code) {\n        case \"EACCES\":\n            debug(bind + \" requires elevated privileges\");\n            process.exit(1);\n            break;\n        case \"EADDRINUSE\":\n            debug(bind + \" is already in use\");\n            process.exit(1);\n            break;\n        default:\n            throw error;\n    }\n}\nexports.onError = onError;\nfunction onListening(server, debug) {\n    const addr = server.address();\n    const bind = typeof addr === \"string\" ? `pipe ${addr}` : `port ${addr.port}`;\n    debug(\"Listening on \" + bind);\n}\nexports.onListening = onListening;\n\n\n//# sourceURL=webpack://phone-numbers-db-backend/./src/utils.ts?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;