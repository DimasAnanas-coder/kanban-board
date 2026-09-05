import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { COLUMN_REPOSITORY } from './application/ports/column.repository.js';
import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import { UNIT_OF_WORK } from './application/ports/unit-of-work.js';
import {
    CreateTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    MoveTaskUseCase,
    TaskListUseCase,
    DeleteTaskUseCase,
    ColumnListUseCase,
    CreateColumnUseCase,
    DeleteColumnUseCase,
    UpdateColumnUseCase,
} from './application/use-cases/index.js';
import { PrismaColumnRepository } from './infrastructure/prisma/prisma-column.repository.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';
import { PrismaUnitOfWork } from './infrastructure/prisma/prisma-unit-of-work.js';

import { ColumnController } from './presentation/rest/controllers/column.controller.js';
import { TaskController } from './presentation/rest/controllers/task.controller.js';
import { ApplicationErrorFilter } from './presentation/rest/filters/application-error.filter.js';


@Module({
    imports: [],
    controllers: [TaskController, ColumnController],
    providers: [
        CreateTaskUseCase,
        GetTaskUseCase,
        UpdateTaskUseCase,
        MoveTaskUseCase,
        TaskListUseCase,
        DeleteTaskUseCase,
        {
            provide: TASK_REPOSITORY,
            useClass: PrismaTaskRepository,
        },

        ColumnListUseCase,
        CreateColumnUseCase,
        DeleteColumnUseCase,
        UpdateColumnUseCase,
        {
            provide: COLUMN_REPOSITORY,
            useClass: PrismaColumnRepository,
        },

        {
            provide: UNIT_OF_WORK,
            useClass: PrismaUnitOfWork,
        },

        {
            provide: APP_FILTER,
            useClass: ApplicationErrorFilter,
        },
    ],
})
export class BoardModule {}
