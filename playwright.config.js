// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : 1,

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright'], // Keeps generating Allure reports
  ],

  /* Shared options */
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // Default to localhost, override with env variable
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'on',
  },
};

module.exports = config;