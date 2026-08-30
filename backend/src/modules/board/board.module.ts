import { Module } from '@nestjs/common';

import { TaskController } from './presentation/rest/controllers/task.controller.js';
import { CreateTaskUseCase } from './application/use-сases/create-task.use-case.js';
import { GetTaskUseCase } from './application/use-сases/get-task.use-case.js';
import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        GetTaskUseCase,
        {
            provide: TASK_REPOSITORY,
            useClass: PrismaTaskRepository
        }
    ],
})
export class BoardModule {}
