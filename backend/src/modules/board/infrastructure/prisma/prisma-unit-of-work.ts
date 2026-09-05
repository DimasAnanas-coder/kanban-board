import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { UnitOfWork, Repositories } from '../../application/ports/unit-of-work.js';
import { PrismaTaskRepository } from './prisma-task.repository.js';
import { PrismaColumnRepository } from './prisma-column.repository.js';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from './prisma.repository.js';
import { TASK_REPOSITORY, TaskRepository } from '../../application/ports/task.repository.js';
import { COLUMN_REPOSITORY, ColumnRepository } from '../../application/ports/column.repository.js';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
    constructor(
        @Inject(TASK_REPOSITORY) private taskRepo: TaskRepository,
        @Inject(COLUMN_REPOSITORY) private columnRepo: ColumnRepository,
        private prisma: PrismaService
    ) {};

    async execute<T>(fn: (repositories: Repositories) => Promise<T>): Promise<T> {
        const taskRepo = this.taskRepo as PrismaTaskRepository;
        const columnRepo = this.columnRepo as PrismaColumnRepository;
        const repositories: Repositories = {
            tasks: taskRepo,
            columns: columnRepo
        }

        const wrape = async (
            repositories: Repositories, 
            fn: (repositories: Repositories) => Promise<T>, 
            tx: Prisma.TransactionClient
        ): Promise<T> => {
            const repos = Object.values(repositories) as PrismaRepository[];

            repos.forEach((repo) => {
                repo.tx = tx;
            });

            try {
                const result = await fn(repositories);
                return result;
            } finally {
                repos.forEach((repo) => {
                    repo.tx = null;
                });
            }
        }

        return this.prisma.$transaction(async (tx) => {
            return wrape(repositories, fn, tx);
        })
    }

}