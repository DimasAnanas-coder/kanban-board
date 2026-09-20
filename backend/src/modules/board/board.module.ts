import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { COLUMN_REPOSITORY } from './application/ports/column.repository.js';
import { TASK_IMAGE_REPOSITORY } from './application/ports/task-image.repository.js';
import { TASK_IMAGE_STORAGE } from './application/ports/task-image.storage.js';
import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import { UNIT_OF_WORK } from './application/ports/unit-of-work.js';
import {
    AddTaskImageUseCase,
    CreateTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    MoveTaskUseCase,
    TaskListUseCase,
    DeleteTaskUseCase,
    DeleteTaskImageUseCase,
    GetTaskImageUseCase,
    TaskImageListUseCase,
    ColumnListUseCase,
    CreateColumnUseCase,
    DeleteColumnUseCase,
    UpdateColumnUseCase,
} from './application/use-cases/index.js';
import { FileTaskImageStorage } from './infrastructure/file-system/file-task-image.storage.js';
import { PrismaColumnRepository } from './infrastructure/prisma/prisma-column.repository.js';
import { PrismaTaskImageRepository } from './infrastructure/prisma/prisma-task-image.repository.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';
import { PrismaUnitOfWork } from './infrastructure/prisma/prisma-unit-of-work.js';
import { ColumnController } from './presentation/rest/controllers/column.controller.js';
import { TaskController } from './presentation/rest/controllers/task.controller.js';
import { TaskImageController } from './presentation/rest/controllers/task-image.controller.js';
import { ApplicationErrorFilter } from './presentation/rest/filters/application-error.filter.js';

@Module({
    imports: [],
    controllers: [TaskController, TaskImageController, ColumnController],
    providers: [
        CreateTaskUseCase,
        GetTaskUseCase,
        UpdateTaskUseCase,
        MoveTaskUseCase,
        TaskListUseCase,
        DeleteTaskUseCase,
        AddTaskImageUseCase,
        GetTaskImageUseCase,
        TaskImageListUseCase,
        DeleteTaskImageUseCase,
        {
            provide: TASK_REPOSITORY,
            useClass: PrismaTaskRepository,
        },
        {
            provide: TASK_IMAGE_REPOSITORY,
            useClass: PrismaTaskImageRepository,
        },
        {
            provide: TASK_IMAGE_STORAGE,
            useClass: FileTaskImageStorage,
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
