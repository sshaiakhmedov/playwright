// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI?2:undefined,
  // Default reporter
  reporter: 'allure-playwright',
  // Custom reporter
  //reporter: './myCustomReporter.js',

  /*Put any shared options on the top level.
  use - is the top global level unles overwritten */
  use: {

    // Configure browser and context here
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'off'
  },
  
};

module.exports = config;