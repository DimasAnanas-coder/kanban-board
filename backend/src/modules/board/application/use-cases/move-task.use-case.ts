import { Injectable, Inject } from '@nestjs/common';

import { 
    ColumnNotFoundError,
    TaskNotFoundError,
    ColumnCapacityExceededError,
    TaskAlreadyInColumnError
} from '../errors/index.js';

import { MoveTaskCommand, TaskData } from '../types/task.data.js';
import { UNIT_OF_WORK, UnitOfWork } from '../ports/unit-of-work.js';
import { COLUMN_CAPACITY } from '../config.js';

@Injectable()
export class MoveTaskUseCase {
    constructor(
        @Inject(UNIT_OF_WORK)
        private readonly uow: UnitOfWork
    ) {}

    async execute(command: MoveTaskCommand): Promise<TaskData> {
        return this.uow.execute(async ({tasks, columns}) => {
            const oldTask = await tasks.findById(command.id);
            if (!oldTask) {
                throw new TaskNotFoundError(command.id);
            }

            if (oldTask.columnId === command.columnId) {
                throw new TaskAlreadyInColumnError();
            }
            
            const oldColumn = await columns.findById(command.columnId);
            if (!oldColumn) {
                throw new ColumnNotFoundError(command.columnId);
            }

            if (await tasks.countByColumnId(command.columnId) >= COLUMN_CAPACITY) {
                throw new ColumnCapacityExceededError();
            }

            return tasks.changeColumn(command);
        })
    }
}
