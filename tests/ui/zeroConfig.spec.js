import { test, expect } from '../../util/fixtures';
import { ZERO_CONFIG_TABLE } from '../../data/zeroConfigTable.data';

test.describe('Zero Config table', () => {
  test('can select table', async ({ zeroConfigPage }) => {
    await zeroConfigPage.goto('https://datatables.net/examples/index');
    await zeroConfigPage.zeroConfigTable.click();
    expect(zeroConfigPage.page).toHaveTitle(ZERO_CONFIG_TABLE.TITLE);

    // number of entries >25
    const textContent = await zeroConfigPage.pageStatus.textContent();
    console.log('textContent:', textContent);
    const numbers = textContent.match(/\d+/g);
    expect(Number(numbers[2])).toBeGreaterThan(25);
  });

  //   test('table has > 25 entries', async ({ page }) => {
  //     const
  //     let totalCount=0
  //     let 1stPageEntriesCount = await page.getByLocator('#example tbdoy tr').count();
  //     if (1stPageEntriesCount)
  //   totalCount=+1stPageEntriesCount
  // });
});
