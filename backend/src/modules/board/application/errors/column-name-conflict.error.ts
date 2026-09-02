import { ApplicationError } from './application.error.js';

export class ColumnNameConflictError extends ApplicationError {
    constructor() {
        super('COLUMN_NAME_CONFLICT', 'Колонка с таким названием уже существует', 'conflict');
    }
}
