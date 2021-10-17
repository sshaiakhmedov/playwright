const { test, expect, Page } = require('@playwright/test');

module.exports={
  helpers:{
    isVisible: async function isVisible (locator) {
      return await expect(locator).toBeVisible();
      }
    }
}


