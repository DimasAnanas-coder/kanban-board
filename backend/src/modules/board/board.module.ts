import { Module } from '@nestjs/common';

import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case.js';
import { GetTaskUseCase } from './application/use-cases/get-task.use-case.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';
import { TaskController } from './presentation/rest/controllers/task.controller.js';

import { APP_FILTER } from '@nestjs/core';
import { ApplicationErrorFilter } from './presentation/rest/filters/application-error.filter.js';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        GetTaskUseCase,
        {
            provide: TASK_REPOSITORY,
            useClass: PrismaTaskRepository,
        },
        {
            provide: APP_FILTER,
            useClass: ApplicationErrorFilter
        }
    ],
})
export class BoardModule {}
