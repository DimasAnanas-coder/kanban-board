import { Injectable, Inject } from '@nestjs/common';

import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';
import type { ColumnData, CreateColumnCommand } from '../types/column.data.js';

@Injectable()
export class CreateColumnUseCase {
    constructor(
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(command: CreateColumnCommand): Promise<ColumnData> {
        return this.columns.createColumn(command);
    }
}
