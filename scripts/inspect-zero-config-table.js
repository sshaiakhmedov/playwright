/**
 * Run this to dump the real DOM structure of the Zero configuration table.
 * Use when fixing or debugging locators. Run from project root:
 *
 *   node scripts/inspect-zero-config-table.js
 *
 * Requires: npx playwright install (browsers)
 */
import { chromium } from '@playwright/test';

const ZERO_CONFIG_URL = 'https://datatables.net/examples/basic_init/zero_configuration.html';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(ZERO_CONFIG_URL, { waitUntil: 'networkidle' });

  const table = page.locator('table').first();
  await table.waitFor({ state: 'visible' });

  const headers = await table.locator('thead th').allTextContents();
  const headerStr = headers.map((h, i) => `  [${i}] "${(h || '').trim()}"`).join('\n');
  console.log('Table headers (index => text):\n' + headerStr);

  const rowCount = await table.locator('tbody tr').count();
  console.log('\nBody rows count:', rowCount);

  if (rowCount > 0) {
    const firstRow = table.locator('tbody tr').first();
    const cells = await firstRow.locator('td').allTextContents();
    const cellStr = cells.map((c, i) => `  [${i}] "${(c || '').trim()}"`).join('\n');
    console.log('First row cells (index => text):\n' + cellStr);
  }

  const ageHeaderIndex = headers.findIndex((h) => (h || '').trim().toLowerCase().includes('age'));
  console.log('\n"Age" header index:', ageHeaderIndex);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
