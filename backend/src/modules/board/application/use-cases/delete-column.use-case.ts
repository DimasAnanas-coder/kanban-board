import { Injectable, Inject } from '@nestjs/common';

import { ColumnNotFoundError } from '../errors/column-not-found.error.js';
import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';

@Injectable()
export class DeleteColumnUseCase {
    constructor(
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(id: number): Promise<void> {
        if (!(await this.columns.deleteColumn(id))) {
            throw new ColumnNotFoundError(id);
        }
    }
}
