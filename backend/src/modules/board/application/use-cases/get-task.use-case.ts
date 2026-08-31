import { Injectable, Inject } from '@nestjs/common';

import { TaskNotFoundError } from '../errors/task-not-found.error.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskData } from '../types/task.data.js';

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
