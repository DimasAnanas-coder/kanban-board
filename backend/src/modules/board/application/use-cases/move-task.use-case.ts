import { Injectable, Inject } from '@nestjs/common';

import { 
    ColumnNotFoundError,
    TaskNotFoundError,
    ColumnCapacityExceededError,
    TaskAlreadyInColumnError,
    BoundaryTasksNotTransferredError,
    CorruptedOrderError
} from '../errors/index.js';

import { MoveTaskCommand, TaskData } from '../types/task.data.js';
import { UNIT_OF_WORK, UnitOfWork } from '../ports/unit-of-work.js';
import { COLUMN_CAPACITY } from '../config.js';
import { mapMoveTaskCommandToRepository } from '../mappers/task.mapper.js';
import { TaskRepository } from '../ports/task.repository.js';

@Injectable()
export class MoveTaskUseCase {
    constructor(
        @Inject(UNIT_OF_WORK)
        private readonly uow: UnitOfWork
    ) {}

    private async calculateOrderId(
        tasks: TaskRepository,
        command: MoveTaskCommand
    ): Promise<number> {
        const { beforeTaskId, afterTaskId } = command;

        if (beforeTaskId == null && afterTaskId == null) {
            throw new BoundaryTasksNotTransferredError(command.id);
        }

        const beforeTask = beforeTaskId != null
            ? await tasks.findById(beforeTaskId)
            : null;

        const afterTask = afterTaskId != null
            ? await tasks.findById(afterTaskId)
            : null;

        if (beforeTaskId != null && !beforeTask) {
            throw new TaskNotFoundError(beforeTaskId);
        }
        if (afterTaskId != null && !afterTask) {
            throw new TaskNotFoundError(afterTaskId);
        }

        if (beforeTask && afterTask) {
            if (beforeTask.orderId >= afterTask.orderId) {
                throw new CorruptedOrderError(beforeTask.orderId, afterTask.orderId);
            }
            return (beforeTask.orderId + afterTask.orderId) / 2;
        }

        if (beforeTask) {
            return beforeTask.orderId + 1;
        }

        return afterTask!.orderId - 1;
    }

    async execute(command: MoveTaskCommand): Promise<TaskData> {
        return this.uow.execute(async ({tasks, columns}) => {
            const oldTask = await tasks.findById(command.id);
            if (!oldTask) {
                throw new TaskNotFoundError(command.id);
            }
            
            const oldColumn = await columns.findById(command.columnId);
            if (!oldColumn) {
                throw new ColumnNotFoundError(command.columnId);
            }

            if (await tasks.countByColumnId(command.columnId) >= COLUMN_CAPACITY) {
                throw new ColumnCapacityExceededError();
            }

            return tasks.changeColumn(mapMoveTaskCommandToRepository(
                command,
                await this.calculateOrderId(tasks, command)
            ));
        })
    }
}
