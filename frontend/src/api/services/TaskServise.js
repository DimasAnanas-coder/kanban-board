import BaseService from "./BaseServise";


export default class TaskService extends BaseService {
    constructor() {
        super('/task');
    }

    async moveTask(taskId, columnId) {
        const response = await apiClient.patch(`${this.endpoint}/${taskId}/column`, { columnId });
        return response.data;
    }
}