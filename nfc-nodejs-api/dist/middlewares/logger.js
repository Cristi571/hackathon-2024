"use strict";
// ./src/middleware/logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.logger = void 0;
// Middleware to log request details
const logger = (req, res, next) => {
    // Store the original send method
    const originalSend = res.send;
    // Override the send method to log the response status code
    res.send = function (...args) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} | [${req.method}] | ${req.originalUrl} | ${res.statusCode}`);
        // Call the original send method
        return originalSend.apply(res, args);
    };
    next();
};
exports.logger = logger;
// Middleware to handle 404 errors
const notFoundHandler = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} | [${req.method}] | ${req.originalUrl} | 404`);
    res.status(404).json({ error: `Wrong URL : [${req.method}] ${req.originalUrl}. It may be deleted or never existed on this server.` });
};
exports.notFoundHandler = notFoundHandler;
// General error-handling middleware
const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toISOString();
    console.error(`${timestamp} | [${req.method}] | ${req.originalUrl} | ${err.status || 500} | ${err.message}`);
    res.status(err.status || 500).json({ error: err.message });
};
exports.errorHandler = errorHandler;
