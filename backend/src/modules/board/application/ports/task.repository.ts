import {
    type UpdateTaskCommand,
    type TaskData,
    type MoveTaskRepositoryCommand,
    type CreateTaskRepositoryCommand,
} from '../types/task.data.js';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepository {
    findById(id: number): Promise<TaskData | null>;
    createTask(command: CreateTaskRepositoryCommand): Promise<TaskData>;
    updateTask(command: UpdateTaskCommand): Promise<TaskData>;
    changeColumn(command: MoveTaskRepositoryCommand): Promise<TaskData>;
    findAll(): Promise<TaskData[]>;
    deleteTask(id: number): Promise<boolean>;
    countByColumnId(columnId: number): Promise<number>;
    getMinOrderTask(columnId: number): Promise<TaskData | null>;
}
