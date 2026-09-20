import { Injectable, Inject } from '@nestjs/common';

import { TaskNotFoundError } from '../errors/index.js';
import { TASK_IMAGE_REPOSITORY, TaskImageRepository } from '../ports/task-image.repository.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskImageData } from '../types/task-image.data.js';

@Injectable()
export class TaskImageListUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(TASK_IMAGE_REPOSITORY)
        private readonly taskImages: TaskImageRepository,
    ) {}

    async execute(taskId: number): Promise<TaskImageData[]> {
        const task = await this.tasks.findById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        return this.taskImages.findAllByTaskId(taskId);
    }
}
