import { Injectable, Inject } from '@nestjs/common';

import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { CreateTaskCommand, TaskData } from '../types/task.data.js';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(command: CreateTaskCommand): Promise<TaskData> {
        return this.tasks.createTask(command);
    }
}
