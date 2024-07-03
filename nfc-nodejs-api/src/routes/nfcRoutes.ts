import { Router } from 'express';
import { authenticateNFC } from '../controllers/nfcController';

const router = Router();

router.post('/authenticate', authenticateNFC);

export default router;
