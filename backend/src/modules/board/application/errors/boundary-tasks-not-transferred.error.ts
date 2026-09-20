import { ApplicationError } from '#core/application/errors/application.error.js';

export class BoundaryTasksNotTransferredError extends ApplicationError {
    constructor(id: number) {
        super(
            'BOUNDARY_TASKS_NOT_TRANSFERRED',
            `Граничные задачи не заданы. Невозможно определить местоположение перемещения задачи ${id}`,
            'bad_request',
        );
    }
}
