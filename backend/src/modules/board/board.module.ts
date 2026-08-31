import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import {
    CreateTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    ChangeTaskColumnUseCase,
} from './application/use-cases/index.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';
import { TaskController } from './presentation/rest/controllers/task.controller.js';
import { ApplicationErrorFilter } from './presentation/rest/filters/application-error.filter.js';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        GetTaskUseCase,
        UpdateTaskUseCase,
        ChangeTaskColumnUseCase,
        {
            provide: TASK_REPOSITORY,
            useClass: PrismaTaskRepository,
        },
        {
            provide: APP_FILTER,
            useClass: ApplicationErrorFilter,
        },
    ],
})
export class BoardModule {}
