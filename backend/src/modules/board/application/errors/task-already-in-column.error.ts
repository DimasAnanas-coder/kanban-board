import { ApplicationError } from './application.error.js';

export class TaskAlreadyInColumnError extends ApplicationError {
    constructor() {
        super(
            'TASK_ALREADY_IN_COLUMN',
            'Перемещаемая задача уже находится в указанной колонке',
            'bad_request',
        );
    }
}
