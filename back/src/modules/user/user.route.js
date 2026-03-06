import {Router} from 'express';
import UserController from './user.controller.js';
import { admin, protect } from '../../middleware/auth.middleware.js';

const router = Router();
const userController = new UserController();

router.get('/', protect, admin, async (req, res) => userController.findAll(req, res));
router.get('/:id', protect, admin,  async (req, res) => userController.findById(req, res));
router.put('/:id', protect,  async (req, res) => userController.update(req, res));
router.delete('/:id', protect,  async (req, res) => userController.delete(req, res));

export default router;