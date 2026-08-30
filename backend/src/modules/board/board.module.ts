import { Module } from '@nestjs/common';

import { TaskController } from './presentation/rest/controllers/task.controller.js';
import TaskService from './domain/services/task.service.js';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService],
})
export class BoardModule {}
