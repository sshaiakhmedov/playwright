import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager.js';
import { Home, FindADoctor, ZeroConfig } from '../pages';

/**
 * @typedef {Object} MyFixtures
 * @property {ApiManager} api
 * @property {Home} homePage
 * @property {FindADoctor} findADoctorPage
 * @property {ZeroConfig} zeroConfigPage
 */

/** @type {import('@playwright/test').TestType<MyFixtures, {}>} */
export const test = base.extend({
  api: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },
  homePage: async ({ page }, use) => {
    const home = new Home(page);
    await use(home);
  },
  findADoctorPage: async ({ page }, use) => {
    const fad = new FindADoctor(page);
    await use(fad);
  },
  zeroConfigPage: async ({ page }, use) => {
    const zeroConfig = new ZeroConfig(page);
    await use(zeroConfig);
  },
});

export { expect };
