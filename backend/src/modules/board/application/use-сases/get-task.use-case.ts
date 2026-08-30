import { Injectable, Inject } from "@nestjs/common";

import { TASK_REPOSITORY, TaskRepository } from "../ports/task.repository.js";
import { CreateTaskCommand, TaskData } from "../types/task.data.js";
import { CreateTaskRequestDTO } from "../../presentation/rest/dto/createTask.request.dto.js";


@Injectable()
export class GetTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly tasks: TaskRepository,
    ) {}

    async execute(id: number): Promise<TaskData | null> {
        return this.tasks.findById(id);
    }
}
