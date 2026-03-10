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
}
