import { Controller, Get, Post, Param, Body, Patch, ParseIntPipe, Delete } from '@nestjs/common';

import {
    CreateTaskUseCase,
    MoveTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    TaskListUseCase,
    DeleteTaskUseCase,
} from '../../../application/use-cases/index.js';
import {
    MoveTaskRequestDTO,
    CreateTaskRequestDTO,
    TaskResponseDTO,
    UpdateTaskRequestDTO,
} from '../dto/index.js';
import {
    mapCreateTaskRequestToInput,
    mapTaskToResponse,
    mapUpdateTaskRequestToInput,
    mapMoveTaskRequestToInput,
} from '../mappers/task.mapper.js';

@Controller('task')
export class TaskController {
    constructor(
        private readonly createTask: CreateTaskUseCase,
        private readonly getTask: GetTaskUseCase,
        private readonly updateTask: UpdateTaskUseCase,
        private readonly moveTask: MoveTaskUseCase,
        private readonly taskList: TaskListUseCase,
        private readonly deleteTask: DeleteTaskUseCase,
    ) {}

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);

        return mapTaskToResponse(task);
    }

    @Post()
    async create(@Body() request: CreateTaskRequestDTO): Promise<TaskResponseDTO> {
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
        @Body() request: MoveTaskRequestDTO,
    ): Promise<TaskResponseDTO> {
        const task = await this.moveTask.execute(
            mapMoveTaskRequestToInput(id, request),
        );

        return mapTaskToResponse(task);
    }

    @Get()
    async findAll(): Promise<TaskResponseDTO[]> {
        const tasks = await this.taskList.execute();
        return tasks.map((task) => mapTaskToResponse(task));
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.deleteTask.execute(id);
    }
}
