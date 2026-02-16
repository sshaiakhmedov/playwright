import { test, expect } from '@playwright/test';
import { Base, FindADoctor, Home } from '../../pages';
import { URLS, LABELS } from '../../constants';
import { HOME_DATA } from '../../data/home.data';

test.describe('Sharp Homepage', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new Home(page);
    await page.goto('/');
  });

  test('landing page title', async ({ page }) => {
    await homePage.getTitle();
    await expect(page).toHaveTitle(HOME_DATA.title);
  });

   test('Hero Button Find a doctor navigates to the correct URL', async ({ page }) => {
    await homePage.findADoctorButton.click();
    await expect(page).toHaveURL(URLS.DOCTORS_PAGE);
  });
});
