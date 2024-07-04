// ./src/middleware/logger.ts

import { Request, Response, NextFunction } from 'express';

// Middleware to log request details
export const logger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} | [${req.method}] | ${req.originalUrl} | ${res.statusCode}`);
    next(); // Call next to move to the next middleware in the chain
};

// Middleware to handle 404 errors
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} | [${req.method}] | ${req.originalUrl} | 404`);
    res.status(404).json({ error: `Wrong URL : [${req.method}] ${req.originalUrl}. It may be deleted or never existed on this server.` });
};


// General error-handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.error(`${timestamp} | [${req.method}] | ${req.originalUrl} | ${err.status || 500} | ${err.message}`);
    res.status(err.status || 500).json({ error: err.message });
};

