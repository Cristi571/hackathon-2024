import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);

export default app;
