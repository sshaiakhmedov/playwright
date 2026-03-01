import { test, expect } from '../../util/fixtures';
import { ZERO_CONFIG_TABLE } from '../../data/zeroConfigTable.data';

test.describe('Zero Config table', () => {
  test.beforeEach(async ({ zeroConfigPage }) => {
    await zeroConfigPage.goto('https://datatables.net/examples/index');
    await zeroConfigPage.zeroConfigTable.click();
    await expect(zeroConfigPage.page).toHaveTitle(ZERO_CONFIG_TABLE.TITLE);
  });

  test.skip('number of entries >25', async ({ zeroConfigPage }) => {
    const textContent = await zeroConfigPage.pageStatus.textContent();
    const numbers = textContent.match(/\d+/g);
    console.log('numbers:', numbers);
    expect(Number(numbers[2])).toBeGreaterThan(ZERO_CONFIG_TABLE.MIN_ENTRIES);
  });

  test.skip('verifies table headers', async ({ zeroConfigPage }) => {
    await zeroConfigPage.table.waitFor({ state: 'visible' });
    const headers = await zeroConfigPage.tableHeaders.allTextContents();
    expect(headers).toEqual(Object.values(ZERO_CONFIG_TABLE.TABLE.HEADERS));
  });

  test('The oldest user with the age of 66', async ({ zeroConfigPage }) => {
    await zeroConfigPage.table.waitFor({ state: 'visible' });
    await zeroConfigPage.ageColumnHeader.click();
    await zeroConfigPage.wait(1000);
    await zeroConfigPage.ageColumnHeader.click();
    await zeroConfigPage.pageStatus.waitFor({ state: 'visible' });
    const oldestUser = await zeroConfigPage.tableRows.first();
    const age = await oldestUser
      .locator('td')
      .nth(Object.values(ZERO_CONFIG_TABLE.TABLE.HEADERS).indexOf(ZERO_CONFIG_TABLE.TABLE.HEADERS.AGE))
      .textContent();
    expect(Number(age)).toBe(ZERO_CONFIG_TABLE.TABLE.OLDEST_AGE);
  });
});
