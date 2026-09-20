import { type CreateTaskImageCommand, type TaskImageData } from '../types/task-image.data.js';

export const TASK_IMAGE_REPOSITORY = Symbol('TASK_IMAGE_REPOSITORY');

export interface TaskImageRepository {
    create(command: CreateTaskImageCommand): Promise<TaskImageData>;
    findById(taskId: number, imageId: number): Promise<TaskImageData | null>;
    findAllByTaskId(taskId: number): Promise<TaskImageData[]>;
    deleteById(taskId: number, imageId: number): Promise<TaskImageData | null>;
    deleteAllByTaskId(taskId: number): Promise<void>;
}
