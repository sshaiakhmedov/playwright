// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : 1,

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright'], // Keeps generating Allure reports
    ['./myCustomReporter.js'], // Your custom reporter
  ],

  /* Shared options */
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'on',
  },
  projects: [
    {
      timeout: 30000, // whole test (ms)
      expect: { timeout: 5000 }, // expect assertions
      name: 'UI Tests',
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        baseURL: 'https://www.sharp.com',
        navigationTimeout: 15000, // page.goto, reload, etc.
        actionTimeout: 10000, // click, fill, check, etc.
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://postman-echo.com', // Different base for API
      },
      timeout: 10000,
    },
  ],
};

export default config;
