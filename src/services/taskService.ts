import {Task} from '../models/Task';

export class TaskService {
  static async getTasks(timeZone: string): Promise<any> {
    try {
      const tasks = await Task.find({});
      return tasks.map((task) => task.toJSON(<any>{ timeZone }));
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  }

  static async getSingleTask(id: string, timeZone: string): Promise<any> {
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error('Task not found');
      }
      return task.toJSON(<any>{ timeZone });
    } catch (error) {
      throw new Error('Error fetching task');
    }
  }

  static async createTask(taskData: any) {
    try {
      const newTask = new Task(taskData);
      const savedTask = await newTask.save();
      if (!savedTask) {
        throw new Error('Task creation failed');
      }
      return savedTask;
    } catch (error) {
      throw new Error('Error creating task');
    }
  }
}