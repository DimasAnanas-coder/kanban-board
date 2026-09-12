import { ApplicationError } from './application.error.js';

export class ColumnEmptyError extends ApplicationError {
    constructor(id: number) {
        super('COLUMN_EMPTY', `Колонка с идентификатором ${id} не содержит задачи`, 'conflict');
    }
}
