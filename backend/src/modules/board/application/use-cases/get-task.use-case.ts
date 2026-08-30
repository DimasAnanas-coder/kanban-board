import { Injectable, Inject } from '@nestjs/common';

import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskData } from '../types/task.data.js';
import { TaskNotFoundError } from '../errors/task-not-found.error.js';

@Injectable()
export class GetTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(id: number): Promise<TaskData> {
        const task = await this.tasks.findById(id);

        if (!task) {
            throw new TaskNotFoundError(id);
        }

        return task;
    }
}
