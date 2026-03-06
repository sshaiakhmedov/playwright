/**
 * Reusable Login component. Use this when multiple page objects share the same
 * login form (e.g. modal, header, or full-page login). Stays DRY by defining
 * locators and actions once.
 *
 * @example
 * // Full-page login (e.g. /login)
 * this.login = new LoginComponent(this.page);
 *
 * @example
 * // Login inside a modal or section (scope to root)
 * this.login = new LoginComponent(this.page, this.page.locator('#login-modal'));
 */
export class LoginComponent {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Locator} [root] - Optional root; all locators are scoped to this (e.g. modal, sidebar).
   */
  constructor(page, root) {
    this.page = page;
    this.root = root ?? page;
  }

  // Locators scoped to root (page or modal/section)

  get loginButton() {
    return this.root.getByRole('link', { name: 'Login / Register' });
  }

  // THese are auto-generated, haven't been used yet
  get usernameInput() {
    return this.root.getByRole('textbox', { name: 'Email or Username:' });
  }

  get passwordInput() {
    return this.root.getByRole('textbox', { name: 'Password:' }).first();
  }

  get signinRegisterButton() {
    return this.root.getByRole('button', { name: 'Sign in' }).first();
  }

  get forgotPasswordLink() {
    return this.root.getByRole('link', { name: 'Forgot?' });
  }

  get notBotCheckbox() {
    return this.root.getByRole('checkbox');
  }

  /**
   * Fill credentials and submit.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signinRegisterButton.click();
  }

  /**
   * Check if the login form is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    return await this.usernameInput.isVisible();
  }
}
