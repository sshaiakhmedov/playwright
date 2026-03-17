import { Base } from './Base.page.js';
import { DemoblazeLoginComponent } from '../components/DemoblazeLogin.component.js';

export class DemoblazeHome extends Base {
  constructor(page) {
    super(page);
    this.loginModal = new DemoblazeLoginComponent(this.page);
  }

  /**
   * Navigate to the Demoblaze home page.
   */
  async goto() {
    await this.page.goto('https://demoblaze.com/');
  }

  get welcomeMessage() {
    return this.page.locator('#nameofuser');
  }

  // --- Product Locators ---
  getProductTitle(title) {
    return this.page.locator('.card-title', { hasText: title });
  }

  getProductPrice(price) {
    return this.page.locator('h5', { hasText: price });
  }

  getProductDescription(description) {
    return this.page.locator('#article', { hasText: description });
  }
}
