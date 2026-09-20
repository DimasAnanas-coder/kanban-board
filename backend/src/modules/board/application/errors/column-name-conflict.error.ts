import { ApplicationError } from '#core/application/errors/application.error.js';

export class ColumnNameConflictError extends ApplicationError {
    constructor() {
        super('COLUMN_NAME_CONFLICT', 'Колонка с таким названием уже существует', 'conflict');
    }
}
