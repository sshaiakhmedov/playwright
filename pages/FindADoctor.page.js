import { expect } from '@playwright/test';
import { Base } from './Base.page.js';
import { FAD_DATA } from '../data/postman.data.js';

export class FindADoctor extends Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  // Locators as getters
  get fadMenu() {
    return this.page.locator('#header-nav-fad');
  }

  get findPrimaryCare() {
    return this.page.locator('#primary-care-doctor-drawer-open');
  }

  get findAspecialist() {
    return this.page.locator('#specialist-doctor-drawer-open > span');
  }

  get findDoctorByName() {
    return this.page.locator('#doctor-drawer-open');
  }

  // Action methods
  async goToFADmenu() {
    await this.click(this.fadMenu);
    await expect(this.page).toHaveTitle(FAD_DATA.titles.fadPage);
  }

  // Verification methods
  async verifyMenuVisible() {
    await expect(this.fadMenu).toBeVisible();
  }

  async verifyAllOptionsVisible() {
    await expect(this.findPrimaryCare).toBeVisible();
    await expect(this.findAspecialist).toBeVisible();
    await expect(this.findDoctorByName).toBeVisible();
  }
}