import { ApplicationError } from './application.error.js';

export class DatabaseError extends ApplicationError {
    constructor() {
        super('DATABASE_ERROR', 'Ошибка базы данных', 'internal_server_error');
    }
}
