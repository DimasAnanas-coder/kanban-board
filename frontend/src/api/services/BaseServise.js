import apiClient from '../config';


export default class BaseService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async getAll() {
        const response = await apiClient.get(this.endpoint);
        return response.data;
    }

    async getById(id) {
        const response = await apiClient.get(`${this.endpoint}/${id}`);
        return response.data;
    }

    async create(data) {
        const response = await apiClient.post(this.endpoint, data);
        return response.data;
    }

    async update(id, data) {
        const response = await apiClient.patch(`${this.endpoint}/${id}`, data);
        return response.data;
    }

    async delete(id) {
        const response = await apiClient.delete(`${this.endpoint}/${id}`);
        return response.data;
    }

}
