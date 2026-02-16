import { expect } from '@playwright/test';
import { Base } from './Base.page.js';
import { FAD_DATA } from '../data/postman.data.js';

export class Home extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  // Locators as getters
  // Hero
  get findADoctorButton() {
    return this.page.locator('#homepage-hero').getByRole('button', { name: 'Find a doctor' })
  }

}