import { Router } from 'express';
import { getAllUsers, createUser, updateUser, updateUserRoles, deleteUser } from '../controllers/userController';
import { isAdmin, isManager, isHimself, isAdminOrManager, isAdminOrManagerOrHimself } from '../middlewares/permissions'; 


const router = Router();

router.get('/list', isAdminOrManager, getAllUsers);
router.post('/create', isAdminOrManager, createUser);
router.patch('/update', isAdminOrManagerOrHimself, updateUser);
router.patch('/update-role', isAdminOrManager, updateUserRoles);
router.delete('/delete/:id', isAdminOrManager, deleteUser);

export default router;
