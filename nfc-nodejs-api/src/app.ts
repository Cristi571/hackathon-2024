import express from 'express';
<<<<<<< HEAD
import routes from './routes'; // Import the main router from the routes directory
import { logger, notFoundHandler, errorHandler } from './middlewares/logger'; // Import the logger and error-handling middlewares
=======
import userRoutes from './routes/userRoutes';
import nfcRoutes from './routes/nfcRoutes';
>>>>>>> 1cb9da7403449d08a044c7cb0e7b24bf02c50285

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

<<<<<<< HEAD

app.use(routes);
// Use the logger middleware
app.use(logger);
// Handle 404 errors
app.use(notFoundHandler);
// Handle other errors
app.use(errorHandler);

=======
// Define routes
app.use('/api/users', userRoutes);
app.use('/api/nfc', nfcRoutes);
>>>>>>> 1cb9da7403449d08a044c7cb0e7b24bf02c50285

export default app;
