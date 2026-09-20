import { ApplicationError } from '#core/application/errors/application.error.js';

export class ColumnNotFoundError extends ApplicationError {
    constructor(id: number) {
        super('COLUMN_NOT_FOUND', `Колонка с идентификатором ${id} не найдена`, 'not_found');
    }
}
