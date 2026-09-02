import type {
    ColumnData,
    CreateColumnCommand,
    UpdateColumnCommand,
} from '../../../application/types/column.data.js';
import {
    ColumnResponseDTO,
    type CreateColumnRequestDTO,
    type UpdateColumnRequestDTO,
} from '../dto/index.js';

export function mapColumnToResponse(column: ColumnData): ColumnResponseDTO {
    return new ColumnResponseDTO(column.id, column.name, column.color);
}

export function mapCreateColumnRequestToInput(
    request: CreateColumnRequestDTO,
): CreateColumnCommand {
    return { name: request.name, color: request.color };
}

export function mapUpdateColumnRequestToInput(
    id: number,
    request: UpdateColumnRequestDTO,
): UpdateColumnCommand {
    return { id, name: request.name, color: request.color };
}
