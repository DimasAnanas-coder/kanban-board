import { Injectable, Inject } from '@nestjs/common';

import { TaskImageNotFoundError, TaskNotFoundError } from '../errors/index.js';
import { TASK_IMAGE_REPOSITORY, TaskImageRepository } from '../ports/task-image.repository.js';
import { TASK_IMAGE_STORAGE, TaskImageStorage } from '../ports/task-image.storage.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';

@Injectable()
export class DeleteTaskImageUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(TASK_IMAGE_REPOSITORY)
        private readonly taskImages: TaskImageRepository,
        @Inject(TASK_IMAGE_STORAGE)
        private readonly taskImageStorage: TaskImageStorage,
    ) {}

    async execute(taskId: number, imageId: number): Promise<void> {
        const task = await this.tasks.findById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        const image = await this.taskImages.deleteById(taskId, imageId);
        if (!image) {
            throw new TaskImageNotFoundError(taskId, imageId);
        }

        await this.taskImageStorage.delete(taskId, image.filename);
    }
}
