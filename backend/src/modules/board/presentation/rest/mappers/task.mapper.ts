import { Task, Prisma } from '@prisma/client';
import { TaskResponseDTO, CreateTaskRequestDTO } from '../dto/index.js';

export function mapTaskToTaskResponse(task: Task): TaskResponseDTO {
    const taskResponse: TaskResponseDTO = {
        id: task.id,
        title: task.title,
        columnName: task.columnName,
        description: task?.description ?? undefined,
        createdAt: task.createdAt
    };

    return taskResponse;
}

export function mapCreateTaskRequestToTask(task: CreateTaskRequestDTO): Prisma.TaskUpdateInput{
    const mappedTask: Prisma.TaskUpdateInput = {
        title: task.title,
        description: task.description
    };

    return mappedTask
}