import { CreateTaskCommand, CreateTaskRepositoryCommand, MoveTaskCommand, MoveTaskRepositoryCommand } from "../types/task.data.js";


export function mapMoveTaskCommandToRepository(
    command: MoveTaskCommand, 
    orderId: number
): MoveTaskRepositoryCommand {
    return {
        id: command.id,
        columnId: command.columnId,
        orderId: orderId,
    }
}

export function mapCreateTaskComandToRepository(
    command: CreateTaskCommand,
    orderId: number
): CreateTaskRepositoryCommand {
    return {
        title: command.title,
        description: command.description,
        columnId: command.columnId,
        orderId: orderId,
    }
}