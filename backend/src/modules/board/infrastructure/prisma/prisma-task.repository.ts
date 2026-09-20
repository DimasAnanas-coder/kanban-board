import { Injectable } from '@nestjs/common';
import { Prisma, Task as PrismaTask } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ColumnNotFoundError, TaskNotFoundError } from '../../application/errors/index.js';
import { TaskRepository } from '../../application/ports/task.repository.js';
import {
    TaskData,
    UpdateTaskCommand,
    CreateTaskRepositoryCommand,
    MoveTaskRepositoryCommand,
} from '../../application/types/task.data.js';

import { PrismaRepository } from './prisma.repository.js';

import { DatabaseError } from '#core/application/errors/database.error.js';

@Injectable()
export class PrismaTaskRepository extends PrismaRepository implements TaskRepository {
    constructor(prisma: PrismaService) {
        super(prisma);
    }

    async findById(id: number): Promise<TaskData | null> {
        const task = await this.service.task.findUnique({
            where: {
                id: id,
            },
        });

        return task ? this.toTaskData(task) : null;
    }

    async createTask(command: CreateTaskRepositoryCommand): Promise<TaskData> {
        try {
            const task = await this.service.task.create({
                data: {
                    title: command.title,
                    description: command.description,
                    orderId: command.orderId,
                    columnId: command.columnId,
                },
            });

            return this.toTaskData(task);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new ColumnNotFoundError(command.columnId);
            }
            throw new DatabaseError();
        }
    }

    async updateTask(command: UpdateTaskCommand): Promise<TaskData> {
        const task = await this.service.task.update({
            where: {
                id: command.id,
            },
            data: {
                ...(command.title !== undefined && { title: command.title }),
                ...(command.description !== undefined && { description: command.description }),
            },
        });

        return this.toTaskData(task);
    }

    async changeColumn(command: MoveTaskRepositoryCommand): Promise<TaskData> {
        try {
            const task = await this.service.task.update({
                where: { id: command.id },
                data: {
                    columnId: command.columnId,
                    orderId: command.orderId,
                },
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
            throw new DatabaseError();
        }
    }

    async findAll(): Promise<TaskData[]> {
        const tasks = await this.service.task.findMany();
        return tasks.map((task) => this.toTaskData(task));
    }

    async deleteTask(id: number): Promise<boolean> {
        const { count } = await this.service.task.deleteMany({
            where: {
                id: id,
            },
        });

        return count > 0;
    }

    async countByColumnId(columnId: number): Promise<number> {
        const count = await this.service.task.count({
            where: {
                columnId: columnId,
            },
        });
        return count;
    }

    async getMinOrderTask(columnId: number): Promise<TaskData | null> {
        return this.service.task.findFirst({
            where: {
                columnId: columnId,
            },
            orderBy: {
                orderId: 'asc',
            },
        });
    }

    private toTaskData(task: PrismaTask): TaskData {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            columnId: task.columnId,
            orderId: task.orderId,
            createdAt: task.createdAt,
        };
    }
}
