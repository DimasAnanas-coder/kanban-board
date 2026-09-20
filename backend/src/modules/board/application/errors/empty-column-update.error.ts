import { ApplicationError } from '#core/application/errors/application.error.js';

export class EmptyColumnUpdateError extends ApplicationError {
    constructor() {
        super(
            'EMPTY_COLUMN_UPDATE',
            'Тело для изменения колонки не может быть пустым',
            'bad_request',
        );
    }
}
