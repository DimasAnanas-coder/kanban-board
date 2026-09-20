import { createReadStream } from 'node:fs';

import {
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
    AddTaskImageUseCase,
    DeleteTaskImageUseCase,
    GetTaskImageUseCase,
    TaskImageListUseCase,
} from '../../../application/use-cases/index.js';
import { TaskImageResponseDTO } from '../dto/index.js';
import {
    getRequestBaseUrl,
    HttpRequest,
    mapTaskImageToResponse,
    mapTaskImageToUrl,
} from '../mappers/task.mapper.js';

interface UploadedImageFile {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}

interface HttpResponse {
    setHeader(name: string, value: string): void;
}

@Controller('task/:taskId/images')
export class TaskImageController {
    constructor(
        private readonly addTaskImage: AddTaskImageUseCase,
        private readonly getTaskImage: GetTaskImageUseCase,
        private readonly taskImageList: TaskImageListUseCase,
        private readonly deleteTaskImage: DeleteTaskImageUseCase,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async addImage(
        @Param('taskId', ParseIntPipe) taskId: number,
        @UploadedFile() file: UploadedImageFile,
        @Req() request: HttpRequest,
    ): Promise<TaskImageResponseDTO> {
        const image = await this.addTaskImage.execute(
            taskId,
            file
                ? {
                      buffer: file.buffer,
                      originalName: file.originalname,
                      mimeType: file.mimetype,
                  }
                : null,
        );

        return mapTaskImageToResponse(
            getRequestBaseUrl(request),
            taskId,
            image.id,
        );
    }

    @Get()
    async findImages(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Req() request: HttpRequest,
    ): Promise<string[]> {
        const images = await this.taskImageList.execute(taskId);
        const baseUrl = getRequestBaseUrl(request);

        return images.map((image) => mapTaskImageToUrl(baseUrl, taskId, image.id));
    }

    @Get(':imageId')
    async findImage(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Param('imageId', ParseIntPipe) imageId: number,
        @Res({ passthrough: true }) response: HttpResponse,
    ): Promise<StreamableFile> {
        const image = await this.getTaskImage.execute(taskId, imageId);
        response.setHeader('Content-Type', image.mimeType);

        return new StreamableFile(createReadStream(image.path));
    }

    @Delete(':imageId')
    async deleteImage(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Param('imageId', ParseIntPipe) imageId: number,
    ): Promise<void> {
        await this.deleteTaskImage.execute(taskId, imageId);
    }
}
