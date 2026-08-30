import type { TaskData } from '../../../application/types/task.data.js';
import { TaskResponseDTO } from '../dto/index.js';

export function mapTaskToResponse(task: TaskData): TaskResponseDTO {
    return new TaskResponseDTO(
        task.id,
        task.title,
        task.columnName,
        task?.description,
        task.createdAt.toISOString()
    );
}
