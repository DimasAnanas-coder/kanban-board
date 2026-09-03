import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ColumnNotFoundError } from '../../application/errors/column-not-found.error.js';
import { TaskNotFoundError } from '../../application/errors/task-not-found.error.js';
import { TaskRepository } from '../../application/ports/task.repository.js';
import {
    ChangeTaskColumnCommand,
    CreateTaskCommand,
    TaskData,
    UpdateTaskCommand,
} from '../../application/types/task.data.js';

const taskInclude = { column: { select: { id: true, name: true, color: true } } } as const;

type PrismaTaskWithColumn = Prisma.TaskGetPayload<{ include: typeof taskInclude }>;

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<TaskData | null> {
        const task = await this.prisma.task.findUnique({
            include: taskInclude,
            where: {
                id: id,
            },
        });

        return task ? this.toTaskData(task) : null;
    }

    async createTask(command: CreateTaskCommand): Promise<TaskData> {
        try {
            const task = await this.prisma.task.create({
                data: {
                    title: command.title,
                    description: command.description,
                    columnId: command.columnId,
                },
                include: taskInclude,
            });

            return this.toTaskData(task);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new ColumnNotFoundError(command.columnId);
            }
            throw error;
        }
    }

    async updateTask(command: UpdateTaskCommand): Promise<TaskData> {
        const task = await this.prisma.task.update({
            include: taskInclude,
            where: {
                id: command.id,
            },
            data: {
                ...(command.title != undefined && { title: command.title }),
                ...(command.description != undefined && { description: command.description }),
            },
        });

        return this.toTaskData(task);
    }

    async changeColumn(command: ChangeTaskColumnCommand): Promise<TaskData> {
        try {
            const task = await this.prisma.task.update({
                where: { id: command.id },
                data: { columnId: command.columnId },
                include: taskInclude,
            });

            return this.toTaskData(task);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new ColumnNotFoundError(command.columnId);
                }
                if (error.code === 'P2025') {
                    throw new TaskNotFoundError(command.id);
                }
            }
            throw error;
        }
    }

    async findAll(): Promise<TaskData[]> {
        const tasks = await this.prisma.task.findMany({ include: taskInclude });
        return tasks.map((task) => this.toTaskData(task));
    }

    async deleteTask(id: number): Promise<boolean> {
        const { count } = await this.prisma.task.deleteMany({
            where: {
                id: id,
            },
        });

        return count > 0;
    }

    private toTaskData(task: PrismaTaskWithColumn): TaskData {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            column: task.column,
            createdAt: task.createdAt,
        };
    }
}
