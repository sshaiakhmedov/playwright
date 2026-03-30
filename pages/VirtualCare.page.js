import { Base } from './Base.page.js';

export class VirtualCare extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /**
   * Returns all accordion buttons on the page.
   */
  get accordionButtons() {
    // Each chevron is a button that contains an h5 heading
    return this.page.getByRole('button').filter({ has: this.page.locator('h5') });
  }

  /**
   * Helper to get the content associated with an accordion button.
   * @param {import('@playwright/test').Locator} button
   */
  async getAccordionContent(button) {
    const ariaControls = await button.getAttribute('aria-controls');
    return this.page.locator(`#${ariaControls}`);
  }

  get symptomsLink() {
    return this.page.getByRole('link', { name: 'various symptoms and conditions' });
  }

  get symptomsSectionHeader() {
    return this.page.getByRole('heading', { name: 'What symptoms can be treated at a virtual care visit?' });
  }

  get symptomsList() {
    return this.page.locator('#virtual-care-symptoms li');
  }

  get newPatientBtn() {
    return this.page.getByRole('button', { name: 'I\'m a new patient' });
  }
}
