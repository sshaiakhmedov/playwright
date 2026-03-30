import { test, expect } from '../../../../util/fixtures.js';
import { SAME_DAY_CARE_DATA } from '../../../../data/sameDayCare.data.js';

test.describe('Same-day care navigation menu', () => {
  test.beforeEach(async ({ homePage }) => {
    // Go to home page and navigate to same-day care
    await homePage.goto(SAME_DAY_CARE_DATA.HOME_URL);
    await homePage.topMainNavLinks.sameDayCare.click();
  });

  test('main blocks are visible', async ({ sameDayCarePage }) => {
    // Verify 3 main blocks are visible
    await expect(sameDayCarePage.mainBlocks.virtualCare).toBeVisible();
    await expect(sameDayCarePage.mainBlocks.urgentCare).toBeVisible();
    await expect(sameDayCarePage.mainBlocks.emergencyCare).toBeVisible();
  });

  test('virtual care option has all elements visible', async ({ sameDayCarePage }) => {
    const vc = sameDayCarePage.virtualCare;

    // Verify virtual care option with all elements visible
    await expect(vc.title).toBeVisible();
    await expect(vc.description).toBeVisible();
    await expect(vc.pediatricBadge).toBeVisible();
    await expect(vc.priceIcon).toBeVisible();
    await expect(vc.availability).toBeVisible();
    await expect(vc.getStartedBtn).toBeVisible();
  });

  test('virtual care Get started opens new page in the same tab', async ({ sameDayCarePage }) => {
    const vc = sameDayCarePage.virtualCare;

    // Click Get started and wait for navigation
    await Promise.all([
      sameDayCarePage.page.waitForURL(SAME_DAY_CARE_DATA.VIRTUAL_CARE_URL_REGEX),
      vc.getStartedBtn.click(),
    ]);

    // Verify it opens a new page in the same tab
    await expect(sameDayCarePage.page).toHaveURL(SAME_DAY_CARE_DATA.VIRTUAL_CARE_URL_REGEX);
  });

  test('virtual care page FAQ accordions expand and retain text', async ({ sameDayCarePage, virtualCarePage }) => {
    const vc = sameDayCarePage.virtualCare;

    // Navigate to Virtual Care page
    await Promise.all([
      sameDayCarePage.page.waitForURL(SAME_DAY_CARE_DATA.VIRTUAL_CARE_URL_REGEX),
      vc.getStartedBtn.click(),
    ]);

    // Get all accordion buttons
    const accordions = await virtualCarePage.accordionButtons.all();
    expect(accordions.length).toBeGreaterThan(0);

    for (const accordion of accordions) {
      const initialText = await accordion.innerText();

      // Click the chevron/accordion
      await accordion.click();

      // Verify original text still exists
      await expect(accordion).toContainText(initialText.trim());

      // Verify new text (content) appears
      const content = await virtualCarePage.getAccordionContent(accordion);
      await expect(content).toBeVisible();
    }
  });

  test('various symptoms and conditions hyperlink scrolls to the related module', async ({ sameDayCarePage, virtualCarePage }) => {
    // Navigate to Virtual Care page
    await Promise.all([
      sameDayCarePage.page.waitForURL(SAME_DAY_CARE_DATA.VIRTUAL_CARE_URL_REGEX),
      sameDayCarePage.virtualCare.getStartedBtn.click(),
    ]);

    // Click the 'various symptoms and conditions' link
    await virtualCarePage.symptomsLink.click();

    // Verify the header is visible and in viewport after clicking
    await expect(virtualCarePage.symptomsSectionHeader).toBeVisible();
    await expect(virtualCarePage.symptomsSectionHeader).toHaveText(SAME_DAY_CARE_DATA.SYMPTOMS_HEADER_TEXT);
    await expect(virtualCarePage.symptomsSectionHeader).toBeInViewport();

    // Verification of symptoms list
    await expect(virtualCarePage.symptomsList.first()).toBeVisible();
    const count = await virtualCarePage.symptomsList.count();
    expect(count).toBeGreaterThan(0);
  });
});
