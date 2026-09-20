import { mkdir, rm, stat, unlink, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { DatabaseError } from '../../application/errors/index.js';
import { TaskImageStorage } from '../../application/ports/task-image.storage.js';
import { TaskImageFileData } from '../../application/types/task-image.data.js';

@Injectable()
export class FileTaskImageStorage implements TaskImageStorage {
    private readonly rootPath = join(process.cwd(), 'storage', 'taskImages');

    async save(taskId: number, filename: string, file: TaskImageFileData): Promise<void> {
        try {
            const taskPath = this.getTaskPath(taskId);
            await mkdir(taskPath, { recursive: true });
            await writeFile(join(taskPath, filename), file.buffer);
        } catch {
            throw new DatabaseError();
        }
    }

    getPath(taskId: number, filename: string): string | null {
        if (!this.isSafeFilename(filename)) {
            return null;
        }

        return join(this.getTaskPath(taskId), filename);
    }

    async delete(taskId: number, filename: string): Promise<void> {
        const imagePath = this.getPath(taskId, filename);
        if (!imagePath) {
            return;
        }

        await unlink(imagePath).catch(() => undefined);
    }

    async deleteAllByTaskId(taskId: number): Promise<void> {
        await rm(this.getTaskPath(taskId), { recursive: true, force: true });
    }

    async exists(taskId: number, filename: string): Promise<boolean> {
        const imagePath = this.getPath(taskId, filename);
        if (!imagePath) {
            return false;
        }

        try {
            const fileStat = await stat(imagePath);
            return fileStat.isFile();
        } catch {
            return false;
        }
    }

    private getTaskPath(taskId: number): string {
        return join(this.rootPath, String(taskId));
    }

    private isSafeFilename(filename: string): boolean {
        return filename === basename(filename);
    }
}
