import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    Body,
    HttpCode
} from '@nestjs/common';

import TaskService from '../../../domain/services/task.service.js';
import { CreateTaskRequestDTO, TaskResponseDTO } from '../dto/index.js';


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    @HttpCode(200)
    async getTask(@Param('id') id: number): Promise<TaskResponseDTO> {
        return await this.taskService.getTask(id);
    }

    @Post()
    @HttpCode(201)
    async createTask(@Body() task: CreateTaskRequestDTO) {
        console.log('Received body:', JSON.stringify(task)); 
        await this.taskService.createTask(task);
    }
}
