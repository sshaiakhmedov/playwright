import { Base } from './Base.page.js';

export class SameDayCare extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  get mainBlocks() {
    return {
      virtualCare: this.page.locator('div').filter({ has: this.page.getByText('Virtual care', { exact: true }) }).first(),
      urgentCare: this.page.locator('div').filter({ has: this.page.getByText('Urgent care', { exact: true }) }).first(),
      emergencyCare: this.page.locator('div').filter({ has: this.page.getByText('Emergency care', { exact: true }) }).first(),
    };
  }

  get virtualCare() {
    const parent = this.mainBlocks.virtualCare;
    return {
      block: parent,
      title: parent.getByText('Virtual care', { exact: true }),
      description: parent.getByText('Care from the comfort of home.'),
      pediatricBadge: parent.getByText('Pediatric services now available'),
      priceIcon: parent.getByText('$', { exact: true }),
      availability: parent.getByText('Days, nights and weekends'),
      getStartedBtn: parent.getByRole('button', { name: 'Get started' }).or(parent.getByRole('link', { name: 'Get started' })).first(),
    };
  }
}
