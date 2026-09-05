import {
    type MoveTaskCommand,
    type UpdateTaskCommand,
    type CreateTaskCommand,
    type TaskData,
} from '../types/task.data.js';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepository {
    findById(id: number): Promise<TaskData | null>;
    createTask(command: CreateTaskCommand): Promise<TaskData>;
    updateTask(command: UpdateTaskCommand): Promise<TaskData>;
    changeColumn(command: MoveTaskCommand): Promise<TaskData>;
    findAll(): Promise<TaskData[]>;
    deleteTask(id: number): Promise<boolean>;
    countByColumnId(columnId: number): Promise<number>;
}
