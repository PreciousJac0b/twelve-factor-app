import Router from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getSingleTask);

export default router;