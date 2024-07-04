"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const routes_1 = __importDefault(require("./routes")); // Import the main router from the routes directory
const logger_1 = require("./middlewares/logger"); // Import the logger and error-handling middlewares
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use(routes_1.default);
// Use the logger middleware
app.use(logger_1.logger);
// Handle 404 errors
app.use(logger_1.notFoundHandler);
// Handle other errors
app.use(logger_1.errorHandler);
=======
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const nfcRoutes_1 = __importDefault(require("./routes/nfcRoutes"));
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Define routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/nfc', nfcRoutes_1.default);
>>>>>>> 1cb9da7403449d08a044c7cb0e7b24bf02c50285
exports.default = app;
