import { ApplicationError } from "./application.error.js";

export class TaskNotFoundError extends ApplicationError {
    constructor(id: number){
        super(
            'TASK_NOT_FOUND',
            `Задача с идентификатором ${id} не найдена`,
            'not_found'
        );
    }
};
