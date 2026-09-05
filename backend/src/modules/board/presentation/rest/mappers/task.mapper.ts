import type {
    MoveTaskCommand,
    CreateTaskCommand,
    TaskData,
    UpdateTaskCommand,
} from '../../../application/types/task.data.js';
import {
    type CreateTaskRequestDTO,
    TaskResponseDTO,
    type UpdateTaskRequestDTO,
    type MoveTaskRequestDTO,
} from '../dto/index.js';

export function mapTaskToResponse(task: TaskData): TaskResponseDTO {
    return new TaskResponseDTO(
        task.id,
        task.title,
        task.columnId,
        task?.description,
        task.createdAt.toISOString(),
    );
}

export function mapCreateTaskRequestToInput(request: CreateTaskRequestDTO): CreateTaskCommand {
    return {
        title: request.title,
        description: request.description,
        columnId: request.columnId,
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

export function mapMoveTaskRequestToInput(
    id: number,
    request: MoveTaskRequestDTO,
): MoveTaskCommand {
    return {
        id: id,
        columnId: request.columnId,
    };
}
