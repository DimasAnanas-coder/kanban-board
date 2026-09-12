export interface TaskData {
    id: number;
    title: string;
    description: string | null;
    columnId: number;
    orderId: number;
    createdAt: Date;
}

export interface CreateTaskCommand {
    title: string;
    description?: string;
    columnId: number;
}

export interface UpdateTaskCommand {
    id: number;
    title?: string;
    description?: string;
}

export interface MoveTaskCommand {
    id: number;
    columnId: number;
    beforeTaskId: number | null;
    afterTaskId: number | null;
}

export interface CreateTaskRepositoryCommand {
    title: string;
    description?: string;
    columnId: number;
    orderId: number
}

export interface MoveTaskRepositoryCommand {
    id: number;
    columnId: number;
    orderId: number
}