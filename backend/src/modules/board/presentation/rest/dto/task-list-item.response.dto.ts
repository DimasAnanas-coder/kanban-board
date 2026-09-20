export class TaskListItemResponseDTO {
    constructor(
        private readonly id: number,
        private readonly title: string,
        private readonly columnId: number,
        private readonly description: string | null,
        private readonly orderId: number,
        private readonly createdAt: string,
        private readonly images: string[],
    ) {}
}
