import { Controller, Get, Post, Param, Body, Patch, ParseIntPipe } from '@nestjs/common';

import {
    CreateTaskUseCase,
    ChangeTaskColumnUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
} from '../../../application/use-cases/index.js';
import {
    ChangeTaskColumnRequestDTO,
    CreateTaskRequestDTO,
    TaskResponseDTO,
    UpdateTaskRequestDTO,
} from '../dto/index.js';
import {
    mapCreateTaskRequestToInput,
    mapTaskToResponse,
    mapUpdateTaskRequestToInput,
    mapChangeTaskColumnRequestToInput,
} from '../mappers/task.mapper.js';

@Controller('task')
export class TaskController {
    constructor(
        private readonly createTask: CreateTaskUseCase,
        private readonly getTask: GetTaskUseCase,
        private readonly updateTask: UpdateTaskUseCase,
        private readonly changeColumn: ChangeTaskColumnUseCase,
    ) {}

    @Get(':id')
    async findById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);

        return mapTaskToResponse(task);
    }

    @Post()
    async create(
        @Body() request: CreateTaskRequestDTO
    ): Promise<TaskResponseDTO> {
        const task = await this.createTask.execute(mapCreateTaskRequestToInput(request));

        return mapTaskToResponse(task);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateTaskRequestDTO,
    ): Promise<TaskResponseDTO> {
        const task = await this.updateTask.execute(mapUpdateTaskRequestToInput(id, request));

        return mapTaskToResponse(task);
    }

    @Patch(':id/column')
    async move(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: ChangeTaskColumnRequestDTO,
    ): Promise<TaskResponseDTO> {
        const task = await this.changeColumn.execute(
            mapChangeTaskColumnRequestToInput(id, request),
        );

        return mapTaskToResponse(task);
    }
}
