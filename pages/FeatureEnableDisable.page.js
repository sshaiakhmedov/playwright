import { Base } from './Base.page.js';

export class FeatureEnableDisable extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  // Web Elements

  get searchInput() {
    return this.page.getByRole('searchbox', { name: 'Search:' });
  }

  // number of entries on the page
  get pageStatus() {
    return this.page.getByRole('status');
  }

  // Table on Feature Enable / Disable page
  get table() {
    const root = this.page.locator('table#example');

    return {
      root,
      headers: root.locator('thead th'),
      rows: root.locator('tbody tr'),
    };
  }

  get pagination() {
    return this.page.locator('.dt-paging');
  }

  get columnOrdering() {
    // Specifically targets the sort indicators inside headers
    return this.table.headers.locator('.dt-column-order');
  }

  /**
   * Returns the specific row locator for a given name
   * @param {string} name
   */
  getRowByName(name) {
    return this.table.rows.filter({ hasText: name }).first();
  }

  /**
   * Returns the age cell for a specific row locator
   * @param {import('@playwright/test').Locator} rowLocator
   */
  getAgeCell(rowLocator) {
    // Age is the 4th column (index 3)
    return rowLocator.locator('td').nth(3);
  }
}
