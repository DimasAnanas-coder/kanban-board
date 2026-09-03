import { Injectable, Inject } from '@nestjs/common';

import { EmptyTaskUpdateError } from '../errors/empty-task-update.error.js';
import { TaskNotFoundError } from '../errors/task-not-found.error.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { UpdateTaskCommand, TaskData } from '../types/task.data.js';

@Injectable()
export class UpdateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(command: UpdateTaskCommand): Promise<TaskData> {
        if (command.description === undefined && command.title === undefined) {
            throw new EmptyTaskUpdateError();
        }

        const oldTask = await this.tasks.findById(command.id);
        if (!oldTask) {
            throw new TaskNotFoundError(command.id);
        }

        return this.tasks.updateTask(command);
    }
}
