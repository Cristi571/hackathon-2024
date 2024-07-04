// ./src/routes/router.ts
import express from 'express';
import userRouter from './userRoutes';
import authRouter from './authRoutes';

const router = express.Router();

// Set the user routes on /user
router.use('/api/users', userRouter);
router.use('/api', authRouter);

// Export main routeur
export default router;