import { ApplicationError } from "./index.js";

export class CorruptedOrderError extends ApplicationError {
    constructor(beforeOrderId: number, afterOrderId: number) {
        super(
            'CORRUPTED_ORDER',
            `Нарушен порядок задач: orderId предыдущей задачи (${beforeOrderId}) не меньше orderId следующей (${afterOrderId})`,
            'internal_server_error'
        );
    }
}