// api/ApiManager.js
import { PostmanAPI } from './Postman.api';
// Import all 100 classes here...

export class ApiManager {
    constructor(request) {
        this.postman = new PostmanAPI(request);
    }
}