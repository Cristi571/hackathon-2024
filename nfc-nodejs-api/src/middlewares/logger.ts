// ./src/middleware/logger.ts

import { Request, Response, NextFunction } from 'express';

// Middleware to log request details
export const logger = (req: Request, res: Response, next: NextFunction) => {
    // Store the original send method
    const originalSend = res.send;

    // Override the send method to log the response status code
    res.send = function(...args) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} | [${req.method}] | ${req.originalUrl} | ${res.statusCode}`);
        
        // Call the original send method
        return originalSend.apply(res, args);
    };

    next();
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

