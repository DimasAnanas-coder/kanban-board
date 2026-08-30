import { type CreateTaskCommand, type TaskData } from '../types/task.data.js';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepository {
    findById(id: number): Promise<TaskData | null>;
    createTask(command: CreateTaskCommand): Promise<TaskData>;
}
