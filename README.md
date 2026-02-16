# JavaScript + Playwright

A test automation setup using Playwright with JavaScript tests and config.

## Project Setup

- **Test Files**: JavaScript (`.js`) using ES modules
- **Config File**: JavaScript (`playwright.config.js`)
- **Node.js**: v18.19 or higher required

## Running Tests

### Default (Headless Mode)
```bash
npm test
```

### Individual single test
```bash
npx playwright test community.spec.js
```

### Single spec, single Browser, Headed mode
```bash
npx playwright test community.spec.js --project=chromium --headed
```

### Headed Mode (Visible Browser Windows)
```bash
npm run test:headed
# or
npm test -- --headed
```

### Debug Mode (Inspector)
```bash
npm run test:debug
# or
npm test -- --debug
```

## Available Flags & Options

Pass any Playwright flag to customize test execution:
```bash
npm test -- [flags]
```

### Common Flags

| Flag | Description |
|------|-------------|
| `--headed` | Run with visible browser windows |
| `--debug` | Run tests in debug mode with inspector |
| `--ui` | Run tests in UI mode (interactive) |
| `--reporter=html` | Generate HTML report (default) |
| `--reporter=list` | List reporter |
| `--workers=1` | Run tests sequentially (default: 4 parallel) |
| `--grep=pattern` | Run tests matching pattern |
| `--project=chromium` | Run only on Chromium browser |
| `--update-snapshots` | Update snapshot files |

### Examples
```bash
# Run tests in UI mode
npm test -- --ui

# Run only tests matching "title"
npm test -- --grep "title"

# Run on single browser only
npm test -- --project=chromium

# Run sequentially with debug
npm test -- --workers=1 --debug

# Run headed with list reporter
npm test -- --headed --reporter=list
```

# Run tests for a specific browser
```
npm run test -- --project=chromium
```
```
npm run test -- --project=firefox
```
```
npm run test -- --project=webkit
```

## Run tests using bash script
```
./run-tests.sh
```

## Running the tests in the container 
1. Build the Docker image
```
docker build -t pw-tests .
```

2.1 Run all tests in Docker based on CMD command in Docker file
```
docker run --rm pw-tests
```

2.2 Run specific test file
```
docker run --rm pw-tests npx playwright test fadMenuInSharpCom.spec.js
```

# Important Note
When passing flags to Playwright through npm, use -- before the flags. This tells npm to pass everything after it to the test command:
```
npm run test -- --headed     # ✅ Correct
npm run test --headed        # ❌ Wrong - npm ignores the flag
```

## Project Structure
```
page-objects/
  ├── BasePage.js               # Base page object class with common methods
  ├── PlaywrightDocsPage.js     # Page object for Playwright docs site
  └── index.js                  # Exports for page objects
tests/
  └── example.spec.js           # JavaScript test file
playwright.config.js            # Playwright configuration
package.json                    # npm scripts and dependencies
```

## Page Objects Pattern

This project uses the **Page Object Model** pattern for better test maintainability:

### BasePage Class
Provides common functionality for all pages:
- Navigation
- Clicking elements
- Filling inputs
- Checking visibility

### Creating a New Page Object
```javascript
import { BasePage } from './BasePage.js';

export class MyPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define selectors as class properties
    this.myButton = page.locator('button#my-button');
    this.myInput = page.locator('input#my-input');
  }

  // Define interaction methods
  async fillMyInput(text) {
    await this.fillInput(this.myInput, text);
  }

  async clickMyButton() {
    await this.click(this.myButton);
  }
}
```

### Using Page Objects in Tests
```javascript
import { test, expect } from '@playwright/test';
import { PlaywrightDocsPage } from '../page-objects/index.js';

test('example', async ({ page }) => {
  const docsPage = new PlaywrightDocsPage(page);
  await docsPage.navigateToDocs();
  await docsPage.clickGetStarted();
  await expect(docsPage.installationHeading).toBeVisible();
});
```

# Testing by different selectors

## getByRole()

#### What is "Role" in Playwright?

Role refers to the **semantic purpose** of an element as understood by assistive technologies (screen readers, etc.).

#### Common Roles
```javascript
page.getByRole('button')      // <button>, <input type="button">, role="button"
page.getByRole('link')        // <a href="...">, role="link"
page.getByRole('heading')     // <h1>, <h2>, <h3>, etc.
page.getByRole('textbox')     // <input type="text">, <textarea>
page.getByRole('checkbox')    // <input type="checkbox">
page.getByRole('img')         // <img>, role="img"
page.getByRole('navigation')  // <nav>, role="navigation"
```

#### Why This Matters

Playwright focuses on **testing like a user** (including users with disabilities):

- A screen reader user navigates by roles: "find me a button", "find me a link"
- `getByRole()` tests that your app is **accessible**
- It's more resilient than CSS selectors

#### WebdriverIO vs Playwright

**WebdriverIO:**
```javascript
// Traditional CSS/XPath selectors
$('button.submit-btn')
$('//a[text()="Community"]')
```

**Playwright:**
```javascript
// User-centric, accessibility-focused
page.getByRole('button', { name: 'Submit' })
page.getByRole('link', { name: 'Community' })
```

#### The Hierarchy Playwright Recommends

1. **`getByRole()`** - Best (tests accessibility)
2. **`getByLabel()`** - Good for forms
3. **`getByPlaceholder()`** - OK for inputs
4. **`getByText()`** - OK for unique text
5. **`locator()` (CSS)** - Last resort

This is part of Playwright's **"testing like a user"** philosophy, which WebdriverIO doesn't emphasize as strongly. It's a key differentiator!

## Notes

- Tests are written in **JavaScript** using ES module syntax
- All test files use `.js` extension
- Page objects centralize selectors and interactions for easy maintenance
- Browsers are installed via `npx playwright install`
- Make sure `"type": "module"` is set in `package.json` to use ES6 imports