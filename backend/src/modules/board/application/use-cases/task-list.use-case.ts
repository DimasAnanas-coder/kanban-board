import { Injectable, Inject } from '@nestjs/common';

import { TASK_REPOSITORY, TaskRepository } from '../ports/task.repository.js';
import { TaskData } from '../types/task.data.js';

@Injectable()
export class TaskListUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(): Promise<TaskData[]> {
        const allTasks = await this.tasks.findAll();

        const byColumn = new Map<number, TaskData[]>();
        for (const task of allTasks) {
            const group = byColumn.get(task.columnId);
            if (group) {
                group.push(task);
            } else {
                byColumn.set(task.columnId, [task]);
            }
        }

        const result: TaskData[] = [];
        for (const group of byColumn.values()) {
            group.sort((a, b) => a.orderId - b.orderId);
            group.forEach((task, index) => {
                result.push({ ...task, orderId: index + 1 });
            });
        }

        return result;
    }
}