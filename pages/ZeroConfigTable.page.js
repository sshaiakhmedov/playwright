import { Base } from './Base.page.js';

export class ZeroConfig extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);
  }

  // Web Elements
  get zeroConfigTable() {
    return this.page.getByRole('link', { name: 'Zero configuration' });
  }

  get searchInput() {
    return this.page.getByRole('searchbox', { name: 'Search:' });
  }

  // number of entries on the page
  get pageStatus() {
    return this.page.getByRole('status');
  }

  // Table on Zero configuration page
  get table() {
    const root = this.page.locator('table#example');

    return {
      root, // now we can chaing using parent table root and avoid writing this.page for each locator
      headers: root.locator('thead th'),
      rows: root.locator('tbody tr'),
    };
  }

  /**
   * Sort a column ascending or descending.
   * DataTables toggles sort order on each click: 1 click => asc, 2 clicks => desc.
   *
   * @param {string} columnName Visible header text (e.g. 'Age', 'Name')
   * @param {'asc'|'desc'} order
   */
  async sortColumnBy(columnName, order) {
    if (order !== 'asc' && order !== 'desc') {
      throw new Error(`Invalid sort order "${order}". Use "asc" or "desc".`);
    }

    const header = this.table.root.locator('.dt-column-header', { hasText: columnName }).first();
    await header.click();
    if (order === 'desc') await header.click();
    await this.pageStatus.waitFor({ state: 'visible' });
  }

  /**
   * Get a cell's text for a given row and column header label.
   * Example: await zeroConfigPage.getCellText(row, 'Age')
   *
   * @param {import('@playwright/test').Locator} row
   * @param {string} headerName
   * @returns {Promise<string>}
   */
  async getCellText(row, headerName) {
    const headers = await this.table.headers.allTextContents();
    const normalized = headers.map((h) => (h || '').trim());
    const colIndex = normalized.findIndex((h) => h.toLowerCase() === headerName.toLowerCase());
    if (colIndex === -1) {
      throw new Error(`Column "${headerName}" not found. Headers: ${normalized.join(', ')}`);
    }

    const text = await row.locator('td').nth(colIndex).textContent();
    return (text ?? '').trim();
  }

  /**
   * Filter table using the global search box and return the first row
   * that matches the provided value. Intended to be used from tests like:
   * const row = await zeroConfigPage.findEntryByValue('Name', 'Airi Satou');
   *
   * @param {string} columnName - header name (e.g. 'Name'); currently used only for clarity
   * @param {string} value - value to search for
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async findEntryByValue(columnName, value) {
    // DataTables global search field
    await this.searchInput.fill(value);
    await this.pageStatus.waitFor({ state: 'visible' });
    return this.table.rows.filter({ hasText: value }).first();
  }
}
