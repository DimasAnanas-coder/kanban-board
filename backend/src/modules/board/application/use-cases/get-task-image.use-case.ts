import { Injectable, Inject } from '@nestjs/common';

import { TaskImageNotFoundError, TaskNotFoundError } from '../errors/index.js';
import { TASK_IMAGE_REPOSITORY, TaskImageRepository } from '../ports/task-image.repository.js';
import { TASK_IMAGE_STORAGE, TaskImageStorage } from '../ports/task-image.storage.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskImageFileResult } from '../types/task-image.data.js';

const IMAGE_MIME_TYPES_BY_EXTENSION: Record<string, string> = {
    avif: 'image/avif',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
};

@Injectable()
export class GetTaskImageUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(TASK_IMAGE_REPOSITORY)
        private readonly taskImages: TaskImageRepository,
        @Inject(TASK_IMAGE_STORAGE)
        private readonly taskImageStorage: TaskImageStorage,
    ) {}

    async execute(taskId: number, imageId: number): Promise<TaskImageFileResult> {
        const task = await this.tasks.findById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        const image = await this.taskImages.findById(taskId, imageId);
        if (!image) {
            throw new TaskImageNotFoundError(taskId, imageId);
        }

        const path = this.taskImageStorage.getPath(taskId, image.filename);
        if (!path || !(await this.taskImageStorage.exists(taskId, image.filename))) {
            throw new TaskImageNotFoundError(taskId, imageId);
        }

        return {
            path: path,
            mimeType: this.getMimeType(image.filename),
        };
    }

    private getMimeType(filename: string): string {
        const extension = filename.split('.').pop()?.toLowerCase() ?? '';
        return IMAGE_MIME_TYPES_BY_EXTENSION[extension] ?? 'application/octet-stream';
    }
}
