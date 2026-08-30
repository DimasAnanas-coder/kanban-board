import { Injectable, 
    NotFoundException,
    BadRequestException, 
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { mapTaskToTaskResponse } from '../../presentation/rest/mappers/task.mapper.js';
import { CreateTaskRequestDTO, TaskResponseDTO } from '../../presentation/rest/dto/index.js';


@Injectable()
export default class TaskService {
    constructor(private prisma: PrismaService) {}

    async getTask(id: number): Promise<TaskResponseDTO>{
        const task: Task | null = await this.prisma.task.findUnique({
            'where': {
                'id': id
            }
        });

        if (!task) {
            throw new NotFoundException('Данной задачи не существует');
        }
        return mapTaskToTaskResponse(task);
    }

    async createTask(task: CreateTaskRequestDTO) {
        if (!task.title) {
            throw new BadRequestException('Название задачи обязательно');
        }
        
        await this.prisma.task.create({
            data: task
        });

    }
}