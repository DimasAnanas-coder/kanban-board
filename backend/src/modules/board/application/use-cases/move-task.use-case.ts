import { Injectable, Inject } from '@nestjs/common';

import { 
    ColumnNotFoundError,
    TaskNotFoundError,
    ColumnCapacityExceededError,
    BoundaryTasksNotTransferredError,
    CorruptedOrderError
} from '../errors/index.js';

import { MoveTaskCommand, TaskData } from '../types/task.data.js';
import { UNIT_OF_WORK, UnitOfWork } from '../ports/unit-of-work.js';
import { BASE_ORDER_ID, COLUMN_CAPACITY } from '../config.js';
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
        return this.uow.execute(async ({ tasks, columns }) => {
            const oldTask = await tasks.findById(command.id);
            if (!oldTask) {
                throw new TaskNotFoundError(command.id);
            }

            const targetColumn = await columns.findById(command.columnId);
            if (!targetColumn) {
                throw new ColumnNotFoundError(command.columnId);
            }

            const targetColumnTaskCount = await tasks.countByColumnId(command.columnId);

            if (targetColumnTaskCount >= COLUMN_CAPACITY) {
                throw new ColumnCapacityExceededError();
            }

            
            const orderId = targetColumnTaskCount === 0
                ? BASE_ORDER_ID
                : await this.calculateOrderId(tasks, command);

            return tasks.changeColumn(mapMoveTaskCommandToRepository(
                command,
                orderId
            ));
        });
    }
}