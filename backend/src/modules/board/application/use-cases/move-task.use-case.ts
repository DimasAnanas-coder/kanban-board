import { Injectable, Inject } from '@nestjs/common';

import { ColumnNotFoundError } from '../errors/column-not-found.error.js';
import { TaskNotFoundError } from '../errors/task-not-found.error.js';
import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';
import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { MoveTaskCommand, TaskData } from '../types/task.data.js';

@Injectable()
export class MoveTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(command: MoveTaskCommand): Promise<TaskData> {
        const oldTask = await this.tasks.findById(command.id);
        if (!oldTask) {
            throw new TaskNotFoundError(command.id);
        }

        if (!(await this.columns.findById(command.columnId))) {
            throw new ColumnNotFoundError(command.columnId);
        }

        return this.tasks.changeColumn(command);
    }
}
