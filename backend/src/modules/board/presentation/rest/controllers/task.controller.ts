import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    Body,
    HttpCode,
    NotFoundException
} from '@nestjs/common';

import { CreateTaskRequestDTO, TaskResponseDTO } from '../dto/index.js';
import { CreateTaskUseCase } from '../../../application/use-сases/create-task.use-case.js';
import { GetTaskUseCase } from '../../../application/use-сases/get-task.use-case.js';
import { mapTaskToResponse } from '../mappers/task.mapper.js';


@Controller('task')
export class TaskController {
    constructor(
        private readonly createTask: CreateTaskUseCase,
        private readonly getTask: GetTaskUseCase
    ) {}

    @Get(':id')
    @HttpCode(200)
    async findById(@Param('id') id: number): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);
        
        if (!task) {
            throw new NotFoundException('Данной задачи нет');
        }

        return mapTaskToResponse(task);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() request: CreateTaskRequestDTO) {
        const task = await this.createTask.execute({
            title: request.title,
            description: request.description,
        });

        return mapTaskToResponse(task);
    }
}
