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

  get topMainNavLinks() {
    return {
      findADoctor: this.page.getByRole('link', { name: 'Find a doctor' }),
      sameDayCare: this.page.getByRole('link', { name: 'Same-day care' }),
      locations: this.page.getByRole('link', { name: 'Locations' }),
    };
  }
  // Hero
  get findADoctorButton() {
    return this.page.locator('#homepage-hero').getByRole('button', { name: 'Find a doctor' });
  }

  get heroHeaderh1() {
    return this.page.getByRole('heading', { name: "San Diego's health care leader" }, { level: 1 });
  }
}
