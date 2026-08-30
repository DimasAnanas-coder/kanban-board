import { Controller, Get, Post, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';

import { CreateTaskUseCase } from '../../../application/use-cases/create-task.use-case.js';
import { GetTaskUseCase } from '../../../application/use-cases/get-task.use-case.js';
import { CreateTaskRequestDTO, TaskResponseDTO } from '../dto/index.js';
import { mapCreateTaskRequestToInput, mapTaskToResponse } from '../mappers/task.mapper.js';

@Controller('task')
export class TaskController {
    constructor(
        private readonly createTask: CreateTaskUseCase,
        private readonly getTask: GetTaskUseCase,
    ) {}

    @Get(':id')
    @HttpCode(200)
    async findById(@Param('id') id: number): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);
        
        return mapTaskToResponse(task);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() request: CreateTaskRequestDTO): Promise<TaskResponseDTO> {
        const task = await this.createTask.execute(
            mapCreateTaskRequestToInput(request)
        );

        return mapTaskToResponse(task);
    }
}
