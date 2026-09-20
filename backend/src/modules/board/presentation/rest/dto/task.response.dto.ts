export class TaskResponseDTO {
    constructor(
        private readonly id: number,
        private readonly title: string,
        private readonly columnId: number,
        private readonly description: string | null,
        private readonly createdAt: string,
        private readonly images: string[],
    ) {}
}
