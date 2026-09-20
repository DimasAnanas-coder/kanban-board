import type {
    MoveTaskCommand,
    CreateTaskCommand,
    TaskData,
    UpdateTaskCommand,
} from '../../../application/types/task.data.js';
import {
    type CreateTaskRequestDTO,
    TaskImageResponseDTO,
    TaskResponseDTO,
    type UpdateTaskRequestDTO,
    type MoveTaskRequestDTO,
    TaskListItemResponseDTO,
} from '../dto/index.js';

export interface HttpRequest {
    protocol: string;
    get(name: string): string | undefined;
}

export function getRequestBaseUrl(request: HttpRequest): string {
    return `${request.protocol}://${request.get('host')}`;
}

export function mapTaskImageToUrl(baseUrl: string, taskId: number, imageId: number): string {
    return `${baseUrl}/task/${taskId}/images/${imageId}`;
}

export function mapTaskImageToResponse(
    baseUrl: string,
    taskId: number,
    imageId: number,
): TaskImageResponseDTO {
    return new TaskImageResponseDTO(imageId, mapTaskImageToUrl(baseUrl, taskId, imageId));
}

export function mapTaskToResponse(
    task: TaskData,
    images: string[] = task.images ?? [],
): TaskResponseDTO {
    return new TaskResponseDTO(
        task.id,
        task.title,
        task.columnId,
        task?.description,
        task.createdAt.toISOString(),
        images,
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
        beforeTaskId: request.beforeTaskId,
        afterTaskId: request.afterTaskId,
    };
}

export function mapTaskToResponseListItem(
    task: TaskData,
    images: string[] = task.images ?? [],
): TaskListItemResponseDTO {
    return new TaskListItemResponseDTO(
        task.id,
        task.title,
        task.columnId,
        task?.description,
        task.orderId,
        task.createdAt.toISOString(),
        images,
    );
}
