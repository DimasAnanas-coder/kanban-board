import { ApplicationError } from '#core/application/errors/application.error.js';

export class TaskImageNotFoundError extends ApplicationError {
    constructor(taskId: number, imageId: number) {
        super(
            'TASK_IMAGE_NOT_FOUND',
            `Изображение ${imageId} для задачи ${taskId} не найдено`,
            'not_found',
        );
    }
}
