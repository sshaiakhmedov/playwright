import { Base } from './Base.page.js';

export class AmplifyHome extends Base {
  constructor(page) {
    super(page);
  }

  // Top navigation links
  get navPrograms() {
    return this.page.getByRole('button', { name: 'Programs' }).or(this.page.getByRole('link', { name: 'Programs' })).first();
  }

  get navServices() {
    return this.page.getByRole('button', { name: 'Services' }).or(this.page.getByRole('link', { name: 'Services' })).first();
  }

  get navResources() {
    return this.page.getByRole('button', { name: 'Resources' }).or(this.page.getByRole('link', { name: 'Resources' })).first();
  }

  get navCommunity() {
    return this.page.getByRole('button', { name: 'Community' }).or(this.page.getByRole('link', { name: 'Community' })).first();
  }

  get navSupport() {
    return this.page.getByRole('button', { name: 'Support' }).or(this.page.getByRole('link', { name: 'Support' })).first();
  }

  // Dropdown
  megaMenu(itemName) {
    return this.page.locator('.menu-item-has-children').filter({ hasText: itemName }).locator('.mega-menu').first();
  }

  async goBackToHome() {
    await this.goto(process.env.AMPLIFY_URL);
  }
}
