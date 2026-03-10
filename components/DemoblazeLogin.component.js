/**
 * Reusable Login component for demoblaze.com.
 * Encapsulates the login modal locators and behavior.
 */
export class DemoblazeLoginComponent {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Locator} [root]
   */
  constructor(page, root) {
    this.page = page;
    this.root = root ?? page;
  }

  get loginLink() {
    return this.root.locator('#login2');
  }

  get usernameInput() {
    return this.root.locator('#loginusername');
  }

  get passwordInput() {
    return this.root.locator('#loginpassword');
  }

  get loginButton() {
    return this.root.locator('button.btn-primary:has-text("Log in")');
  }

  /**
   * Check if the login modal is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    return await this.usernameInput.isVisible();
  }

  /**
   * Open the login modal by clicking the login link.
   */
  async openLoginModal() {
    await this.loginLink.click();
  }

  /**
   * Fill credentials and submit.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
