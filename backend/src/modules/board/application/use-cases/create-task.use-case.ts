import { Injectable, Inject } from '@nestjs/common';

import { 
    ColumnNotFoundError, 
    ColumnCapacityExceededError,
    ColumnEmptyError,
} from '../errors/index.js';

import { UNIT_OF_WORK, UnitOfWork } from '../ports/unit-of-work.js';
import { CreateTaskCommand, TaskData } from '../types/task.data.js';
import { BASE_ORDER_ID, COLUMN_CAPACITY } from '../config.js';
import { mapCreateTaskComandToRepository } from '../mappers/task.mapper.js';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(UNIT_OF_WORK)
        private readonly uow: UnitOfWork,
    ) {}

    async execute(command: CreateTaskCommand): Promise<TaskData> {
        return this.uow.execute(async ({tasks, columns}) => {
            const column = await columns.findById(command.columnId);
            if (!column) {
                throw new ColumnNotFoundError(command.columnId);
            }

            if (await tasks.countByColumnId(column.id) >= COLUMN_CAPACITY) {
                throw new ColumnCapacityExceededError();
            }

            const minOrderTask = await tasks.getMinOrderTask(column.id);
            let newTaskOrderId = BASE_ORDER_ID;
            if (minOrderTask) {
                newTaskOrderId = minOrderTask.orderId - 1;
            }
           
            return tasks.createTask(mapCreateTaskComandToRepository(
                command,
                newTaskOrderId
            ));
        })
        
    }
}
