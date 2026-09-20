export interface TaskImageFileData {
    buffer: Buffer;
    originalName: string;
    mimeType: string;
}

export interface TaskImageData {
    id: number;
    filename: string;
    taskId: number;
    createdAt: Date;
}

export interface CreateTaskImageCommand {
    filename: string;
    taskId: number;
}

export interface TaskImageFileResult {
    path: string;
    mimeType: string;
}
