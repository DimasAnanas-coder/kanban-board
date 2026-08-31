export interface TaskData {
    id: number;
    title: string;
    description: string | null;
    columnName: string;
    createdAt: Date;
}

export interface CreateTaskCommand {
    title: string;
    description?: string;
}

export interface UpdateTaskCommand {
    id: number;
    title?: string;
    description?: string;
}

export interface ChangeTaskColumnCommand {
    id: number;
    columnName: string;
}
