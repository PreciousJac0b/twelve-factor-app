import { TaskService } from '../services/taskService';
import { validateTaskData } from '../validations/validateTask';

export class TaskController {
  static async getTasks(req: any, res: any) {
    const timeZone = req.query.timeZone || 'Africa/Lagos';
    try {
      const tasks = await TaskService.getTasks(timeZone);
      res.json({ success: true, data: tasks });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getSingleTask(req: any, res: any) {
    const { id } = req.params;
    const timeZone = req.query.timeZone || 'Africa/Lagos';
    try {
      const task = await TaskService.getSingleTask(id, timeZone);
      res.json({ success: true, data: task });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createTask(req: any, res: any) {
    const taskData = req.body;
    
    const validation = validateTaskData(taskData);
    if (!validation.success) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    try {
      const newTask = await TaskService.createTask(taskData);
      res.status(201).json({ success: true, data: newTask });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}