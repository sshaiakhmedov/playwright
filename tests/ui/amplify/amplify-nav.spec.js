import { test, expect } from '../../../util/fixtures.js';

test.describe.skip('Amplify Top Navigation', () => {
  // As per requirement: you always need to go back and click nav menu from the main page
  test('all top nav links are clickable, active, open dropdowns or navigate correctly', async ({ amplifyHomePage }) => {
    await test.step('Navigate to the homepage', async () => {
      await amplifyHomePage.goto(process.env.AMPLIFY_URL);
      await expect(amplifyHomePage.page).toHaveURL(/amplify.com/);
    });

    const megaMenuItems = [
      { name: 'Programs', locator: amplifyHomePage.navPrograms },
      { name: 'Resources', locator: amplifyHomePage.navResources },
      { name: 'Support', locator: amplifyHomePage.navSupport },
    ];

    for (const item of megaMenuItems) {
      await test.step(`Verify "${item.name}" dropdown works`, async () => {
        await item.locator.click();
        await expect(amplifyHomePage.megaMenu(item.name)).toBeVisible();
        await amplifyHomePage.goBackToHome();
      });
    }

    const directNavigations = [
      { name: 'Services', locator: amplifyHomePage.navServices, url: /services/ },
      { name: 'Community', locator: amplifyHomePage.navCommunity, url: /community/ },
    ];

    for (const item of directNavigations) {
      await test.step(`Verify "${item.name}" navigates out and returns`, async () => {
        await item.locator.click();
        await expect(amplifyHomePage.page).toHaveURL(item.url);
        await amplifyHomePage.goBackToHome();
      });
    }
  });
});
