import { ApplicationError } from '#core/application/errors/application.error.js';

export class ColumnCapacityExceededError extends ApplicationError {
    constructor() {
        super('COLUMN_CAPACITY_EXCEEDED', 'В колонке слишком много задач', 'conflict');
    }
}
