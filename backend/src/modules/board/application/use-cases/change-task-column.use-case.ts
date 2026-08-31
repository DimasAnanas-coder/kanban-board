import { Injectable, Inject } from '@nestjs/common';

import { TaskNotFoundError } from '../errors/task-not-found.error.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { ChangeTaskColumnCommand, TaskData } from '../types/task.data.js';

@Injectable()
export class ChangeTaskColumnUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(command: ChangeTaskColumnCommand): Promise<TaskData> {
        const oldTask = await this.tasks.findById(command.id);
        if (!oldTask) {
            throw new TaskNotFoundError(command.id);
        }

        return this.tasks.changeColumn(command);
    }
}
