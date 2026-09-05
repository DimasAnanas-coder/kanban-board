import { Injectable } from '@nestjs/common';
import { Prisma, Column as PrismaColumn } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { 
    ColumnNameConflictError, 
    ColumnNotEmptyError,
    ColumnNotFoundError 
} from '../../application/errors/index.js';
import type { ColumnRepository } from '../../application/ports/column.repository.js';
import type {
    ColumnData,
    CreateColumnCommand,
    UpdateColumnCommand,
} from '../../application/types/column.data.js';
import { PrismaRepository } from './prisma.repository.js';


@Injectable()
export class PrismaColumnRepository extends PrismaRepository implements ColumnRepository {
    constructor(prisma: PrismaService) {
        super(prisma);
    }
    
    async findById(id: number): Promise<ColumnData | null> {
        const column = await this.service.column.findUnique({ 
            where: { id }
        });
        return column ? this.toColumnData(column) : null;
    }

    async findAll(): Promise<ColumnData[]> {
        const columns = await this.service.column.findMany();
        return columns.map((column) => this.toColumnData(column));
    }

    async createColumn(command: CreateColumnCommand): Promise<ColumnData> {
        try {
            const column = await this.service.column.create({
                data: { 
                    name: command.name, 
                    color: command.color 
                },
            });
            return this.toColumnData(column);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ColumnNameConflictError();
            }
            throw error;
        }
    }

    async updateColumn(command: UpdateColumnCommand): Promise<ColumnData> {
        try {
            const column = await this.service.column.update({
                where: { id: command.id },
                data: { 
                    name: command.name, 
                    color: command.color 
                },
            });
            return this.toColumnData(column);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ColumnNameConflictError();
                }
                if (error.code === 'P2025') {
                    throw new ColumnNotFoundError(command.id);
                }
            }
            throw error;
        }
    }

    async deleteColumn(id: number): Promise<boolean> {
        try {
            const { count } = await this.service.column.deleteMany({ 
                where: { id } 
            });

            return count > 0;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new ColumnNotEmptyError(id);
            }
            throw error;
        }
    }

    private toColumnData(column: PrismaColumn): ColumnData {
        return {
            id: column.id,
            name: column.name,
            color: column.color,
        };
    }
}
