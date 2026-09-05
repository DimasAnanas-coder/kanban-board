import { Injectable, Inject } from '@nestjs/common';

import { TaskNotFoundError } from '../errors/index.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';

@Injectable()
export class DeleteTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(id: number): Promise<void> {
        if (!(await this.tasks.deleteTask(id))) {
            throw new TaskNotFoundError(id);
        }
    }
}
