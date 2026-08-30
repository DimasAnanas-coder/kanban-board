import { Module } from '@nestjs/common';

import { TASK_REPOSITORY } from './application/ports/task.repository.js';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case.js';
import { GetTaskUseCase } from './application/use-cases/get-task.use-case.js';
import { PrismaTaskRepository } from './infrastructure/prisma/prisma-task.repository.js';
import { TaskController } from './presentation/rest/controllers/task.controller.js';

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
    ],
})
export class BoardModule {}
