import { ApplicationError } from '#core/application/errors/application.error.js';

export class InvalidTaskImageError extends ApplicationError {
    constructor() {
        super(
            'INVALID_TASK_IMAGE',
            'Файл изображения не передан или имеет неверный формат',
            'bad_request',
        );
    }
}
