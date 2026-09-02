import { Injectable, Inject } from '@nestjs/common';

import { ColumnNotFoundError } from '../errors/column-not-found.error.js';
import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { CreateTaskCommand, TaskData } from '../types/task.data.js';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(command: CreateTaskCommand): Promise<TaskData> {
        if (!(await this.columns.findById(command.columnId))) {
            throw new ColumnNotFoundError(command.columnId);
        }

        return this.tasks.createTask(command);
    }
}
