import { defaultClient as client, defaultPool as pool } from '@database/connection';
import { TaskDB } from '@database/Classes/TaskDB';
import { ITask } from '@database/Interfaces';

export class TaskService {
  private taskDB = new TaskDB(client, pool);

  async getTasks(): Promise<ITask> {
    const foundTasks = await this.taskDB.getAll();
    return foundTasks;
  }

  async updateStatusTask(task_id: string, task: ITask): Promise<ITask> {
    const updatedTask = await this.taskDB.updateStatus(task_id, task);
    return updatedTask;
  }

  async getTaskById(task_id: string): Promise<ITask> {
    const foundLeeson = await this.taskDB.getById(task_id);
    return foundLeeson;
  }

  async createTask(task: ITask): Promise<ITask> {
    const createdTask = await this.taskDB.create(task);
    return createdTask;
  }

  async updateTask(task_id: string, task: ITask): Promise<ITask> {
    const updatedTask = await this.taskDB.updateById(task_id, task);
    return updatedTask;
  }

  async deleteTask(task_id: string): Promise<ITask> {
    const deletedTask = await this.taskDB.deleteById(task_id);
    return deletedTask;
  }
}
