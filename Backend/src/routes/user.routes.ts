import express from 'express';
import { deleteUserHandler, getMeHandler } from '../controllers/user.controller';
import { updateUserHandler, toggleUserHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/me', getMeHandler);
router.put('/update', updateUserHandler);
router.put('/toggle', toggleUserHandler);
router.delete('/delete', deleteUserHandler);


export default router;
