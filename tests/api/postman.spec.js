// tests/api/postman.spec.js
import { test, expect } from '../../util/fixtures';

test.describe('Postman Echo API Tests', () => {

    test('GET with 2 query parameters returns 200', async ({ api }) => {
            // You can now pass any key-value pairs here
        const queryParams = {
            key1: 'bar1',
            key2: 'bar2',
            key3: 'extraParam' 
        };

        const response = await api.postman.getPostmanEcho(queryParams);
        console.log(JSON.stringify(response, null, 2));
        // Assertions remain dynamic based on what you passed
        expect(response.args.key1).toBe('bar1');
        expect(response.args.key3).toBe('extraParam');
    });

    test('POST with JSON payload returns 200', async ({ api }) => {
        const payload = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30
        };

        const response = await api.postman.postPostmanEcho(payload);
        console.log(JSON.stringify(response, null, 2));
        // Assertions based on the payload you sent
        expect(response.json.name).toBe('John Doe');
        expect(response.json.age).toBe(30);
        expect(response.json.email).toBe('john.doe@example.com');
    });
});