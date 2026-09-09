import apiClient from "../config";
import BaseService from "./BaseServise";


export default class TaskService extends BaseService {
    constructor() {
        super('/task');
    }

    async move(taskId, columnId) {
        const response = await apiClient.patch(`${this.endpoint}/${taskId}/column`, { columnId });
        return response.data;
    }
}