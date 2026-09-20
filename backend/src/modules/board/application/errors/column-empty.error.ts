import { ApplicationError } from '#core/application/errors/application.error.js';

export class ColumnEmptyError extends ApplicationError {
    constructor(id: number) {
        super('COLUMN_EMPTY', `Колонка с идентификатором ${id} не содержит задачи`, 'conflict');
    }
}
