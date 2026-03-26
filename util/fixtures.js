import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager.js';
import { Home, FindADoctor, ZeroConfig, FeatureEnableDisable, DemoblazeHome, AmplifyHome, SameDayCare } from '../pages/index.js';

/**
 * @typedef {Object} MyFixtures
 * @property {ApiManager} api
 * @property {Home} homePage
 * @property {FindADoctor} findADoctorPage
 * @property {ZeroConfig} zeroConfigPage
 * @property {FeatureEnableDisable} featureEnableDisablePage
 * @property {DemoblazeHome} demoblazeHomePage
 * @property {AmplifyHome} amplifyHomePage
 * @property {SameDayCare} sameDayCarePage
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
  featureEnableDisablePage: async ({ page }, use) => {
    const featureEnableDisable = new FeatureEnableDisable(page);
    await use(featureEnableDisable);
  },
  demoblazeHomePage: async ({ page }, use) => {
    const demoblazeHome = new DemoblazeHome(page);
    await use(demoblazeHome);
  },
  amplifyHomePage: async ({ page }, use) => {
    const amplifyHome = new AmplifyHome(page);
    await use(amplifyHome);
  },
  sameDayCarePage: async ({ page }, use) => {
    const sameDayCare = new SameDayCare(page);
    await use(sameDayCare);
  },
});

export { expect };
