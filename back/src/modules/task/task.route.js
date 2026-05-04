import { protect } from '../../middleware/auth.protect.js';
import TaskController from './task.controller.js';
import { Router } from 'express';

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get('/',protect, async (req, res) => taskController.findAll(req, res));
taskRouter.get('/:id', protect, async (req, res) => taskController.findById(req, res));
taskRouter.post('/', protect, async (req, res) => taskController.create(req, res));
taskRouter.put('/:id', protect, async (req, res) => taskController.update(req, res));
taskRouter.delete('/:id', protect, async (req, res) => taskController.delete(req, res));

export default taskRouter;