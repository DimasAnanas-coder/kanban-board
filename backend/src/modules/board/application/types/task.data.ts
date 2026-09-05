export interface TaskData {
    id: number;
    title: string;
    description: string | null;
    columnId: number;
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
}
