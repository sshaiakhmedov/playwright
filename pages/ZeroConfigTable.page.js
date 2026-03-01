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

  // number of entries on the page
  get pageStatus() {
    return this.page.getByRole('status');
  }

  // Table on Zero configuration page
  get table() {
    return this.page.locator('table#example');
  }

  get tableHeaders() {
    return this.table.locator('thead th');
  }

  get tableRows() {
    return this.table.locator('tbody tr');
  }

  get ageColumnHeader() {
    return this.table.locator('.dt-column-header:has-text("Age")');
  }
}
