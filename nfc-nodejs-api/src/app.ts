import express from 'express';
import userRoutes from './routes/userRoutes';
import nfcRoutes from './routes/nfcRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/nfc', nfcRoutes);

export default app;
