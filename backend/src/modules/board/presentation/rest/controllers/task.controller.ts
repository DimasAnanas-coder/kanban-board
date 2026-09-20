import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
} from '@nestjs/common';

import {
    CreateTaskUseCase,
    MoveTaskUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    TaskListUseCase,
    DeleteTaskUseCase,
    TaskImageListUseCase,
} from '../../../application/use-cases/index.js';
import {
    MoveTaskRequestDTO,
    CreateTaskRequestDTO,
    TaskResponseDTO,
    UpdateTaskRequestDTO,
    TaskListItemResponseDTO,
} from '../dto/index.js';
import {
    mapCreateTaskRequestToInput,
    mapTaskToResponse,
    mapUpdateTaskRequestToInput,
    mapMoveTaskRequestToInput,
    mapTaskToResponseListItem,
    HttpRequest,
    getRequestBaseUrl,
    mapTaskImageToUrl,
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
        private readonly taskImageList: TaskImageListUseCase,
    ) {}

    @Get(':id')
    async findById(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: HttpRequest,
    ): Promise<TaskResponseDTO> {
        const task = await this.getTask.execute(id);
        const images = await this.getImageUrls(request, id);

        return mapTaskToResponse(task, images);
    }

    @Post()
    async create(
        @Body() request: CreateTaskRequestDTO,
    ): Promise<TaskResponseDTO> {
        const task = await this.createTask.execute(
            mapCreateTaskRequestToInput(request),
        );

        return mapTaskToResponse(task, []);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateTaskRequestDTO,
        @Req() httpRequest: HttpRequest,
    ): Promise<TaskResponseDTO> {
        const task = await this.updateTask.execute(
            mapUpdateTaskRequestToInput(id, request),
        );
        const images = await this.getImageUrls(httpRequest, id);

        return mapTaskToResponse(task, images);
    }

    @Patch(':id/column')
    async move(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: MoveTaskRequestDTO,
        @Req() httpRequest: HttpRequest,
    ): Promise<TaskResponseDTO> {
        const task = await this.moveTask.execute(
            mapMoveTaskRequestToInput(id, request),
        );
        const images = await this.getImageUrls(httpRequest, id);

        return mapTaskToResponse(task, images);
    }

    @Get()
    async findAll(
        @Req() request: HttpRequest,
    ): Promise<TaskListItemResponseDTO[]> {
        const tasks = await this.taskList.execute();
        const responseTasks: TaskListItemResponseDTO[] = [];

        for (const task of tasks) {
            const images = await this.getImageUrls(request, task.id);
            responseTasks.push(mapTaskToResponseListItem(task, images));
        }

        return responseTasks;
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.deleteTask.execute(id);
    }

    private async getImageUrls(request: HttpRequest, taskId: number): Promise<string[]> {
        const images = await this.taskImageList.execute(taskId);
        const baseUrl = getRequestBaseUrl(request);

        return images.map((image) => mapTaskImageToUrl(baseUrl, taskId, image.id));
    }
}
