import type {
    ChangeTaskColumnCommand,
    CreateTaskCommand,
    TaskData,
    UpdateTaskCommand,
} from '../../../application/types/task.data.js';
import {
    type CreateTaskRequestDTO,
    TaskResponseDTO,
    type UpdateTaskRequestDTO,
    type ChangeTaskColumnRequestDTO,
} from '../dto/index.js';

export function mapTaskToResponse(task: TaskData): TaskResponseDTO {
    return new TaskResponseDTO(
        task.id,
        task.title,
        task.columnName,
        task?.description,
        task.createdAt.toISOString(),
    );
}

export function mapCreateTaskRequestToInput(request: CreateTaskRequestDTO): CreateTaskCommand {
    return {
        title: request.title,
        description: request.description,
    };
}

export function mapUpdateTaskRequestToInput(
    id: number,
    request: UpdateTaskRequestDTO,
): UpdateTaskCommand {
    return {
        id: id,
        title: request.title,
        description: request.description,
    };
}

export function mapChangeTaskColumnRequestToInput(
    id: number,
    request: ChangeTaskColumnRequestDTO,
): ChangeTaskColumnCommand {
    return {
        id: id,
        columnName: request.columnName,
    };
}
