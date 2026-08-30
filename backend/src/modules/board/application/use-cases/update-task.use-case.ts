import { Injectable, Inject } from '@nestjs/common';

import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { UpdateTaskCommand, TaskData } from '../types/task.data.js';
import { TaskNotFoundError } from '../errors/task-not-found.error.js';

@Injectable()
export class UpdateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) { }

    async execute(command: UpdateTaskCommand): Promise<TaskData> {
        const oldTask = await this.tasks.findById(command.id);
        if (!oldTask){
            throw new TaskNotFoundError(command.id);
        }

        return await this.tasks.updateTask(command);
    }
}