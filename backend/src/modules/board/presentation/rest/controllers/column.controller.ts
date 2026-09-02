import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import {
    ColumnListUseCase,
    CreateColumnUseCase,
    DeleteColumnUseCase,
    UpdateColumnUseCase,
} from '../../../application/use-cases/index.js';
import { ColumnResponseDTO, CreateColumnRequestDTO, UpdateColumnRequestDTO } from '../dto/index.js';
import {
    mapColumnToResponse,
    mapCreateColumnRequestToInput,
    mapUpdateColumnRequestToInput,
} from '../mappers/column.mapper.js';

@Controller('column')
export class ColumnController {
    constructor(
        private readonly columnList: ColumnListUseCase,
        private readonly createColumn: CreateColumnUseCase,
        private readonly deleteColumn: DeleteColumnUseCase,
        private readonly updateColumn: UpdateColumnUseCase,
    ) {}

    @Get()
    async findAll(): Promise<ColumnResponseDTO[]> {
        const columns = await this.columnList.execute();
        return columns.map((column) => mapColumnToResponse(column));
    }

    @Post()
    async create(@Body() request: CreateColumnRequestDTO): Promise<ColumnResponseDTO> {
        const column = await this.createColumn.execute(mapCreateColumnRequestToInput(request));
        return mapColumnToResponse(column);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.deleteColumn.execute(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() request: UpdateColumnRequestDTO,
    ): Promise<ColumnResponseDTO> {
        const column = await this.updateColumn.execute(mapUpdateColumnRequestToInput(id, request));
        return mapColumnToResponse(column);
    }
}
