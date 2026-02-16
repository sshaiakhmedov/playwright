/**
 * Base page class that all page objects extend from.
 * Provides common functionality for interacting with pages.
 */
export class Base {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get page URL
   * @returns {string}
   */
  getURL() {
    return this.page.url();
  }

  /**
   * Click element
   * @param {import('@playwright/test').Locator} locator
   */
  async click(locator) {
    await locator.click();
  }

  /**
   * Double click element
   * @param {import('@playwright/test').Locator} locator
   */
  async doubleClick(locator) {
    await locator.dblclick();
  }

  /**
   * Fill input field
   * @param {import('@playwright/test').Locator} locator
   * @param {string} text
   */
  async fill(locator, text) {
    await locator.fill(text);
  }

  /**
   * Clear and fill input field
   * @param {import('@playwright/test').Locator} locator
   * @param {string} text
   */
  async clearAndFill(locator, text) {
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Type text with delay (simulates real typing)
   * @param {import('@playwright/test').Locator} locator
   * @param {string} text
   * @param {number} delay - Delay in ms between keystrokes
   */
  async type(locator, text, delay = 100) {
    await locator.type(text, { delay });
  }

  /**
   * Select option from dropdown
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   */
  async selectOption(locator, value) {
    await locator.selectOption(value);
  }

  /**
   * Check checkbox or radio button
   * @param {import('@playwright/test').Locator} locator
   */
  async check(locator) {
    await locator.check();
  }

  /**
   * Uncheck checkbox
   * @param {import('@playwright/test').Locator} locator
   */
  async uncheck(locator) {
    await locator.uncheck();
  }

  /**
   * Check if element is visible
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  async isVisible(locator) {
    return await locator.isVisible();
  }

  /**
   * Check if element is hidden
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  async isHidden(locator) {
    return await locator.isHidden();
  }

  /**
   * Check if element is enabled
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  async isEnabled(locator) {
    return await locator.isEnabled();
  }

  /**
   * Check if element is disabled
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  async isDisabled(locator) {
    return await locator.isDisabled();
  }

  /**
   * Get element text content
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getText(locator) {
    return await locator.textContent();
  }

  /**
   * Get element inner text
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getInnerText(locator) {
    return await locator.innerText();
  }

  /**
   * Get input value
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getValue(locator) {
    return await locator.inputValue();
  }

  /**
   * Get attribute value
   * @param {import('@playwright/test').Locator} locator
   * @param {string} attributeName
   * @returns {Promise<string|null>}
   */
  async getAttribute(locator, attributeName) {
    return await locator.getAttribute(attributeName);
  }

  /**
   * Wait for element to be visible
   * @param {import('@playwright/test').Locator} locator
   * @param {number} timeout - Timeout in ms (default: 30000)
   */
  async waitForVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param {import('@playwright/test').Locator} locator
   * @param {number} timeout - Timeout in ms (default: 30000)
   */
  async waitForHidden(locator, timeout = 30000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for specific timeout
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Scroll element into view
   * @param {import('@playwright/test').Locator} locator
   */
  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Hover over element
   * @param {import('@playwright/test').Locator} locator
   */
  async hover(locator) {
    await locator.hover();
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Press keyboard key
   * @param {string} key - Key to press (e.g., 'Enter', 'Escape')
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward() {
    await this.page.goForward();
  }

  /**
   * Get count of elements matching locator
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<number>}
   */
  async getCount(locator) {
    return await locator.count();
  }
}