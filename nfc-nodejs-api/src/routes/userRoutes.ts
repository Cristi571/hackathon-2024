import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';

const router = Router();

router.get('/list', getAllUsers);
router.post('/create', createUser);

export default router;
