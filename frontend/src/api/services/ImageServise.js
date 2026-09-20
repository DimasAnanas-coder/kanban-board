import apiClient from '../config';


export default class ImageService {
    constructor() {
        this.endpoint = '/task';
    }

    async getAll(taskId) {
        const response = await apiClient.get(`${this.endpoint}/${taskId}/images`);
        return response.data;
    }

    async create(taskId, file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await apiClient.post(
            `${this.endpoint}/${taskId}/images`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        return response.data;
    }

    async delete(taskId, imageUrl) {
        const response = await apiClient.delete(`${this.endpoint}/${taskId}/images/${this.getImageId(imageUrl)}`);
        return response.data;
    }

    getImageId(imageUrl) {
        return imageUrl.split('/').pop();
    }
}
