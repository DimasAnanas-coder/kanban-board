import { ApplicationError } from './application.error.js';

export class ColumnNotEmptyError extends ApplicationError {
    constructor(id: number) {
        super('COLUMN_NOT_EMPTY', `Колонка с идентификатором ${id} содержит задачи`, 'conflict');
    }
}
