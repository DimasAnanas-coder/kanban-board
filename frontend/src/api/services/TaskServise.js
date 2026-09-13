import apiClient from '../config';
import BaseService from './BaseServise';


export default class TaskService extends BaseService {
    constructor() {
        super('/task');
    }

    async move(taskId, columnId, beforeTaskId, afterTaskId) {
        const response = await apiClient.patch(`${this.endpoint}/${taskId}/column`, { columnId, beforeTaskId, afterTaskId });
        return response.data;
    }
}
