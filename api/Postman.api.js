import { BaseAPI } from './Base.api.js';
import { API_ENDPOINTS } from '../constants/index.js'; // Import from your new constants

export class PostmanAPI extends BaseAPI {
    constructor(request, token) {
        super(request, token);
    }

    async getPostmanEcho(queryParams) {
        const response = await this.get(`${API_ENDPOINTS.POSTMAN_ECHO_GET}`, { params: queryParams });
        return response;
    }

    async postPostmanEcho(payload) {
        // Sends a POST request with search filters
        const response = await this.request.post(API_ENDPOINTS.POSTMAN_ECHO_POST, {
            data: payload
        });
        return this.validateAndParse(response, 200);
    }
}