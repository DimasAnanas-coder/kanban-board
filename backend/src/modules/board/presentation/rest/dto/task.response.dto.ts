export class TaskResponseDTO {
    constructor(
        private readonly id: number,
        private readonly title: string,
        private readonly columnName: string,
        private readonly description: string | null,
        private readonly createdAt: string,
    ) {}
}
