import {Router} from 'express';
import UserController from './user.controller.js';
import {protect} from '../../middleware/auth.protect.js';
import {admin} from '../../middleware/auth.admin.js';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', protect, admin, async (req, res) => userController.findAll(req, res));
userRouter.get('/:id', protect, admin,  async (req, res) => userController.findById(req, res));
userRouter.put('/:id', protect,  async (req, res) => userController.update(req, res));
userRouter.delete('/:id', protect,  async (req, res) => userController.delete(req, res));

export default userRouter;