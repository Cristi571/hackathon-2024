import express from 'express';
import { authenticateUser } from '../controllers/authController';

const router = express.Router();

// Handle NFC card authentication
router.post('/authenticate', authenticateUser);

export default router;
