import { Router } from 'express';
import { addUser } from '../controllers/userController';

const router = Router();

<<<<<<< HEAD
router.get('/list', getAllUsers);
router.post('/create', createUser);
=======
router.post('/add-user', addUser);
>>>>>>> 1cb9da7403449d08a044c7cb0e7b24bf02c50285

export default router;
