
import express from 'express';
import routes from './routes'; // Import the main router from the routes directory
// Import the logger and error-handling middlewares
import { logger, notFoundHandler, errorHandler } from './middlewares/logger'; 
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the logger middleware
app.use(logger);
app.use(routes);
// Handle 404 errors
app.use(notFoundHandler);
// Handle other errors
app.use(errorHandler);


export default app;
