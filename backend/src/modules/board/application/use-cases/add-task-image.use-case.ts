import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

import { Injectable, Inject } from '@nestjs/common';

import { InvalidTaskImageError, TaskNotFoundError } from '../errors/index.js';
import { TASK_IMAGE_REPOSITORY, TaskImageRepository } from '../ports/task-image.repository.js';
import { TASK_IMAGE_STORAGE, TaskImageStorage } from '../ports/task-image.storage.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskImageData, TaskImageFileData } from '../types/task-image.data.js';

@Injectable()
export class AddTaskImageUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(TASK_IMAGE_REPOSITORY)
        private readonly taskImages: TaskImageRepository,
        @Inject(TASK_IMAGE_STORAGE)
        private readonly taskImageStorage: TaskImageStorage,
    ) {}

    async execute(taskId: number, file: TaskImageFileData | null): Promise<TaskImageData> {
        const task = await this.tasks.findById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        if (!file || !file.mimeType.startsWith('image/')) {
            throw new InvalidTaskImageError();
        }

        const filename = this.createFilename(file);
        await this.taskImageStorage.save(taskId, filename, file);

        try {
            return await this.taskImages.create({
                filename: filename,
                taskId: taskId,
            });
        } catch (error) {
            await this.taskImageStorage.delete(taskId, filename);
            throw error;
        }
    }

    private createFilename(file: TaskImageFileData): string {
        const extension = extname(file.originalName).toLowerCase();
        if (extension) {
            return `${randomUUID()}${extension}`;
        }

        return `${randomUUID()}.${file.mimeType.split('/')[1] ?? 'jpg'}`;
    }
}
