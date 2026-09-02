import type { ColumnData, CreateColumnCommand, UpdateColumnCommand } from '../types/column.data.js';

export const COLUMN_REPOSITORY = Symbol('COLUMN_REPOSITORY');

export interface ColumnRepository {
    findById(id: number): Promise<ColumnData | null>;
    findAll(): Promise<ColumnData[]>;
    createColumn(command: CreateColumnCommand): Promise<ColumnData>;
    updateColumn(command: UpdateColumnCommand): Promise<ColumnData>;
    deleteColumn(id: number): Promise<boolean>;
}
