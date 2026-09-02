import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ColumnNameConflictError } from '../../application/errors/column-name-conflict.error.js';
import { ColumnNotEmptyError } from '../../application/errors/column-not-empty.error.js';
import { ColumnNotFoundError } from '../../application/errors/column-not-found.error.js';
import type { ColumnRepository } from '../../application/ports/column.repository.js';
import type {
    ColumnData,
    CreateColumnCommand,
    UpdateColumnCommand,
} from '../../application/types/column.data.js';

const columnSelect = { id: true, name: true, color: true } as const;

@Injectable()
export class PrismaColumnRepository implements ColumnRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<ColumnData | null> {
        return this.prisma.column.findUnique({ where: { id }, select: columnSelect });
    }

    async findAll(): Promise<ColumnData[]> {
        return this.prisma.column.findMany({ select: columnSelect, orderBy: { id: 'asc' } });
    }

    async createColumn(command: CreateColumnCommand): Promise<ColumnData> {
        try {
            return await this.prisma.column.create({
                data: { name: command.name, color: command.color },
                select: columnSelect,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ColumnNameConflictError();
            }
            throw error;
        }
    }

    async updateColumn(command: UpdateColumnCommand): Promise<ColumnData> {
        try {
            return await this.prisma.column.update({
                where: { id: command.id },
                data: { name: command.name, color: command.color },
                select: columnSelect,
            });
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
            const { count } = await this.prisma.column.deleteMany({ where: { id } });
            return count > 0;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new ColumnNotEmptyError(id);
            }
            throw error;
        }
    }
}
