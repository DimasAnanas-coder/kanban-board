import { Controller, Get, Post, Param, Body, HttpCode, NotFoundException, Patch } from '@nestjs/common';

import { CreateTaskUseCase } from '../../../application/use-cases/create-task.use-case.js';
import { GetTaskUseCase } from '../../../application/use-cases/get-task.use-case.js';
import { UpdateTaskUseCase } from '../../../application/use-cases/update-task.use-case.js';
import { CreateTaskRequestDTO, TaskResponseDTO, UpdateTaskRequestDTO } from '../dto/index.js';
import { mapCreateTaskRequestToInput, mapTaskToResponse, mapUpdateTaskRequestToInput } from '../mappers/task.mapper.js';

@Controller('task')
export class TaskController {
    constructor(
        private readonly createTask: CreateTaskUseCase,
        private readonly getTask: GetTaskUseCase,
        private readonly updateTask: UpdateTaskUseCase,
    ) {}

    @Get(':id')
    async findById(@Param('id') id: number): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);

        return mapTaskToResponse(task);
    }

    @Post()
    async create(@Body() request: CreateTaskRequestDTO): Promise<TaskResponseDTO> {
        const task = await this.createTask.execute(
            mapCreateTaskRequestToInput(request)
        );

        return mapTaskToResponse(task);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() request: UpdateTaskRequestDTO
    ): Promise<TaskResponseDTO> {
        const task = await this.updateTask.execute(
            mapUpdateTaskRequestToInput(id, request)
        );

        return mapTaskToResponse(task);
    }
}
