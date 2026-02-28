import { expect, test } from '@playwright/test';
import { Base } from '../pages';

export class ZeroConfig extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page);
  }

  // getters
  get zeroConfigTable() {
    return this.page.getByRole('link', { name: 'Zero configuration' });
  }

  get pageStatus() {
    return this.page.getByRole('status');
  }
}
