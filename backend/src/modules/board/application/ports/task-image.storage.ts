import { type TaskImageFileData } from '../types/task-image.data.js';

export const TASK_IMAGE_STORAGE = Symbol('TASK_IMAGE_STORAGE');

export interface TaskImageStorage {
    save(taskId: number, filename: string, file: TaskImageFileData): Promise<void>;
    getPath(taskId: number, filename: string): string | null;
    exists(taskId: number, filename: string): Promise<boolean>;
    delete(taskId: number, filename: string): Promise<void>;
    deleteAllByTaskId(taskId: number): Promise<void>;
}
