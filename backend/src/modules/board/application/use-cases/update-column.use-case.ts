import { Injectable, Inject } from '@nestjs/common';

import { ColumnNotFoundError } from '../errors/column-not-found.error.js';
import { EmptyColumnUpdateError } from '../errors/empty-column-update.error.js';
import { COLUMN_REPOSITORY, type ColumnRepository } from '../ports/column.repository.js';
import type { ColumnData, UpdateColumnCommand } from '../types/column.data.js';

@Injectable()
export class UpdateColumnUseCase {
    constructor(
        @Inject(COLUMN_REPOSITORY)
        private readonly columns: ColumnRepository,
    ) {}

    async execute(command: UpdateColumnCommand): Promise<ColumnData> {
        if (command.name === undefined && command.color === undefined) {
            throw new EmptyColumnUpdateError();
        }

        if (!(await this.columns.findById(command.id))) {
            throw new ColumnNotFoundError(command.id);
        }

        return this.columns.updateColumn(command);
    }
}
