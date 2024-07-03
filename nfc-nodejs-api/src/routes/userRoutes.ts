import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { isAdmin } from '../middlewares/permissions'; 


const router = Router();

router.get('/list', isAdmin, getAllUsers);
router.post('/create', createUser);

export default router;
