import { TaskRepository } from "./task.repository.js";
import { ColumnRepository } from "./column.repository.js";


export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');

export interface Repositories {
    tasks: TaskRepository;
    columns: ColumnRepository;
};


export interface UnitOfWork {
    execute<T>(fn: 
        (repositories: Repositories) => Promise<T>
    ): Promise<T>
};
