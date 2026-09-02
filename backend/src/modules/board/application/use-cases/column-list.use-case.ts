import { Injectable, Inject } from '@nestjs/common';

import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';
import type { ColumnData } from '../types/column.data.js';

@Injectable()
export class ColumnListUseCase {
    constructor(
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(): Promise<ColumnData[]> {
        return this.columns.findAll();
    }
}
