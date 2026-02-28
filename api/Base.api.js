// api/Base.api.js
export class BaseAPI {
    constructor(request, token) {
        this.request = request;
        this.token = token; // Store the token if provided
    }

    async get(endpoint, options = {}, expectedStatus = 200) {
        // Merge the Auth header into existing options
        const mergedOptions = {
            ...options,
            headers: {
                ...options.headers,
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            }
        };
        const response = await this.request.get(endpoint, mergedOptions);
        return await this.validateAndParse(response, expectedStatus); 
    }

      async post(endpoint, options = {}, expectedStatus = 200) {
        const response = await this.request.post(endpoint, options);
        return await this.validateAndParse(response, expectedStatus); 
    }



    /**
     * Validates the response status code and parses the body as JSON or text.
     * @param {import('@playwright/test').APIResponse} response - The raw response from a Playwright request.
     * @param {number} [expectedStatus=200] - The HTTP status code expected for this test case.
     * @returns {Promise<any>} - A promise that resolves to the parsed JSON object or raw text string.
     * @throws {Error} - Throws a descriptive error if the status code does not match the expected value.
    */
   async validateAndParse(response, expectedStatus = 200) {
        // 1. Check the status code first
        if (response.status() !== expectedStatus) {
            const errorBody = await response.text(); // Get raw text for the error
            throw new Error(`Status Mismatch! Expected ${expectedStatus} but got ${response.status()}.\nResponse: ${errorBody}`);
        }

        // 2. Attempt to parse as JSON, fallback to text if it fails
        try {
            return await response.json(); 
        } catch (e) {
            return await response.text(); 
        }
    }
}