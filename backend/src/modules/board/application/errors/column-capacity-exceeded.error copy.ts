import { ApplicationError } from './application.error.js';

export class ColumnCapacityExceededError extends ApplicationError {
    constructor() {
        super('COLUMN_CAPACITY_EXCEEDED', 'В колонке слишком много задач', 'conflict');
    }
}
