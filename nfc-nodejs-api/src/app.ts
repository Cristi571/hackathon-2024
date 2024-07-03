import express from 'express';
import routes from './routes'; // Import the main router from the routes directory
import { logger, notFoundHandler, errorHandler } from './middlewares/logger'; // Import the logger and error-handling middlewares

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.use(routes);
// Use the logger middleware
app.use(logger);
// Handle 404 errors
app.use(notFoundHandler);
// Handle other errors
app.use(errorHandler);


export default app;
