import { Injectable, Inject } from '@nestjs/common';

import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskData } from '../types/task.data.js';

@Injectable()
export class TaskListUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(): Promise<TaskData[]> {
        return this.tasks.findAll();
    }
}
