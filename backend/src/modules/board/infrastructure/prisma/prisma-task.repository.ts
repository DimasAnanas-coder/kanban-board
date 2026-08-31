import { Injectable } from '@nestjs/common';
import type { Task as PrismaTask } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import {
    ChangeTaskColumnCommand,
    CreateTaskCommand,
    TaskData,
    UpdateTaskCommand,
} from '../../application/types/task.data.js';
import { TaskRepository } from '../../application/ports/task.repository.js';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<TaskData | null> {
        const task = await this.prisma.task.findUnique({
            where: {
                id: id,
            },
        });

        return task ? this.toTaskData(task) : null;
    }

    async createTask(command: CreateTaskCommand): Promise<TaskData> {
        const task = await this.prisma.task.create({
            data: {
                title: command.title,
                description: command.description,
            },
        });

        return this.toTaskData(task);
    }

    async updateTask(command: UpdateTaskCommand): Promise<TaskData> {
        const task = await this.prisma.task.update({
            where: {
                id: command.id,
            },
            data: {
                ...(command.title && { title: command.title }),
                ...(command.description && { description: command.description }),
            },
        });

        return this.toTaskData(task);
    }

    async changeColumn(command: ChangeTaskColumnCommand): Promise<TaskData> {
        const task = await this.prisma.task.update({
            where: {
                id: command.id,
            },
            data: {
                columnName: command.columnName,
            },
        });

        return this.toTaskData(task);
    }

    async findAll(): Promise<TaskData[]> {
        return this.prisma.task.findMany();
    }


    private toTaskData(task: PrismaTask): TaskData {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            columnName: task.columnName,
            createdAt: task.createdAt,
        };
    }
}
