import { ApplicationError } from "./application.error.js";

export class EmptyTaskUpdateError extends ApplicationError {
    constructor() {
        super('EMPTY_TASK_UPDATE', 'Тело для изменения задачи не может быть пустым', 'bad_request');
    }
};
