import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import type { Task as PrismaTask } from '@prisma/client';

import { CreateTaskCommand, TaskData } from "../../application/types/task.data.js";



@Injectable()
export class PrismaTaskRepository {
    constructor(private prisma: PrismaService) {};

    async findById(id: number): Promise<TaskData | null> {
        const task = await this.prisma.task.findUnique({
            'where': {
                'id': id
            }
        });

        return task ? this.toTaskData(task) : null;
    }

    async createTask(command: CreateTaskCommand): Promise<TaskData> {
        const task = await this.prisma.task.create({
            data: {
                title: command.title,
                description: command.description
            }
        });

        return this.toTaskData(task);
    }

    private toTaskData(task: PrismaTask): TaskData {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            columnName: task.columnName,
            createdAt: task.createdAt
        };
    }
}