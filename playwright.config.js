// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright'], // Keeps generating Allure reports
  ],

  /* Shared options */
  use: {
    browserName: 'chromium',
    headless: process.env.CI? true : false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'on',
  },
};

module.exports = config;