export interface ColumnData {
    id: number;
    name: string;
    color: string;
}

export interface CreateColumnCommand {
    name: string;
    color: string;
}

export interface UpdateColumnCommand {
    id: number;
    name?: string;
    color?: string;
}
