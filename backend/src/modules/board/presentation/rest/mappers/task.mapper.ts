import type { CreateTaskCommand, TaskData } from '../../../application/types/task.data.js';
import { CreateTaskRequestDTO, TaskResponseDTO } from '../dto/index.js';

export function mapTaskToResponse(task: TaskData): TaskResponseDTO {
    return new TaskResponseDTO(
        task.id,
        task.title,
        task.columnName,
        task?.description,
        task.createdAt.toISOString(),
    );
}

export function mapCreateTaskRequestToInput(
    request: CreateTaskRequestDTO,
): CreateTaskCommand {
    return {
        title: request.title,
        description: request.description,
    };
}
