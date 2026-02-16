import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager.js';

/**
 * @typedef {Object} MyFixtures
 * @property {ApiManager} api
 */

/** @type {import('@playwright/test').TestType<MyFixtures, {}>} */
export const test = base.extend({
    api: async ({ request }, use) => {
        const apiManager = new ApiManager(request);
        await use(apiManager);
    }
});

export { expect };