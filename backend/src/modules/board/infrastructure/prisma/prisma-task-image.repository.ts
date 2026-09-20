import { Injectable } from '@nestjs/common';
import { Prisma, TaskImage as PrismaTaskImage } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { TaskImageRepository } from '../../application/ports/task-image.repository.js';
import { CreateTaskImageCommand, TaskImageData } from '../../application/types/task-image.data.js';

import { PrismaRepository } from './prisma.repository.js';

import { DatabaseError } from '#core/application/errors/database.error.js';

@Injectable()
export class PrismaTaskImageRepository extends PrismaRepository implements TaskImageRepository {
    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async create(command: CreateTaskImageCommand): Promise<TaskImageData> {
        try {
            const image = await this.service.taskImage.create({
                data: {
                    filename: command.filename,
                    taskId: command.taskId,
                },
            });

            return this.toTaskImageData(image);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new DatabaseError();
            }
            throw new DatabaseError();
        }
    }

    async findById(taskId: number, imageId: number): Promise<TaskImageData | null> {
        const image = await this.service.taskImage.findFirst({
            where: {
                id: imageId,
                taskId: taskId,
            },
        });

        return image ? this.toTaskImageData(image) : null;
    }

    async findAllByTaskId(taskId: number): Promise<TaskImageData[]> {
        const images = await this.service.taskImage.findMany({
            where: {
                taskId: taskId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return images.map((image) => this.toTaskImageData(image));
    }

    async deleteById(taskId: number, imageId: number): Promise<TaskImageData | null> {
        const image = await this.findById(taskId, imageId);
        if (!image) {
            return null;
        }

        await this.service.taskImage.delete({
            where: {
                id: imageId,
            },
        });

        return image;
    }

    async deleteAllByTaskId(taskId: number): Promise<void> {
        await this.service.taskImage.deleteMany({
            where: {
                taskId: taskId,
            },
        });
    }

    private toTaskImageData(image: PrismaTaskImage): TaskImageData {
        return {
            id: image.id,
            filename: image.filename,
            taskId: image.taskId,
            createdAt: image.createdAt,
        };
    }
}
