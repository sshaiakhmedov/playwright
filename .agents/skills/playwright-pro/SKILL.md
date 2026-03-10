---
name: playwright-pro
description: Helps work with this repository's Playwright JS setup, including fixtures, page objects, reusable UI components and DRY patterns. Use when adding or updating tests, page objects, or components.
---

# Playwright Pro (Project Skill)

## Overview

This project uses **Playwright + JavaScript (ESM)** with:

- Custom fixtures in `util/fixtures.js` (`test` + `expect` re-export)
- Page objects in `pages/` that extend `Base`
- Reusable UI components in `components/` (e.g. `LoginComponent`)
- Data and constants separated into `data/` and `constants/`

Always import from `../../util/fixtures` in tests so fixtures and `expect` are consistent.

## How to Add a new UI spec or test

*** FLOW: ***
   1. go over the MUST DO and NEVER DO sections.
   2. go over the MANDATORY VERIFICATION CHECKLIST.
   3. go over the FINAL CHECK.

*** MUST DO: ***
1. **Create/extend a page object** in `pages/` (or reuse an existing one).
2. **Use fixtures** from `util/fixtures.js` instead of raw `@playwright/test`:
3. Try to use beforeEach or beforeAll hooks if needed.
4. Use the browser tool to explore the DOM before writing any locators.
5. use .env file for environment variables.
6. read constants from constants/ or data/ folder as per the case.
7. use page objects from pages/ folder.
8. use components from components/ folder.
9. use fixtures from util/fixtures.js.
10. If new spec implies new Page Object, Component, Fixture, Constant, Data, or Locator, create it in the appropriate folder.

*** NEVER DO THE FOLLOWING: ***
1. Never store lcoators in the spec files.
2. Never store constants in the spec files.
3. Never store data in the spec files.
4. Never store environment variables in the spec files.
5. Never store page objects in the spec files.
6. Never store components in the spec files.
7. Never store fixtures in the spec files.

**MANDATORY VERIFICATION CHECKLIST:** Before finalizing any UI Test implementation, you MUST explicitly go through this checklist and verify it to the user:
   - [ ] No locators in the spec file
   - [ ] No constants in the spec file
   - [ ] No test data or hardcoded strings (URLs, usernames, passwords) in the spec file
   - [ ] No environment variables read directly inside the `describe` blocks without being extracted to data/constants
   - [ ] Using Page Objects from `pages/`
   - [ ] Using Components from `components/` where UI is shared
   - [ ] Prioritizing `getByRole()` over  any other locator strategy. Here is the order of locator strategies:
   - getByRole
   - getByLabel
   - getByPlaceholder
   - getByText
   - getByAltText
   - getByTitle
   - getByTestId


## How to run tests

Look at package.json scripts.

1. Always run healdess
2. If headless passes - run in a headed mode.

```javascript
import { test, expect } from '../../util/fixtures';

test('example', async ({ homePage }) => {
  await homePage.goto('https://www.sharp.com/');
  await expect(homePage.page).toHaveTitle(/Sharp/);
});
```

3. Prefer **`getByRole` / user-centric locators** in page objects and components; keep raw CSS in `locator()` as a last resort.

## Page Objects

### Pattern

- All pages extend `Base` from `pages/Base.page.js`.
- Use getters for locators and instance methods for actions.

```javascript
import { Base } from './Base.page.js';

export class Home extends Base {
  constructor(page) {
    super(page);
  }

  get findADoctorButton() {
    return this.page.locator('#homepage-hero').getByRole('button', { name: 'Find a doctor' });
  }
}
```

### Wiring into fixtures

Add new page objects to `util/fixtures.js` so tests can use them as typed fixtures:

```javascript
import { Home, FindADoctor, ZeroConfig } from '../pages';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const home = new Home(page);
    await use(home);
  },
  // add newPage the same way
});
```

Use the fixture in tests:

```javascript
test('hero button navigates', async ({ homePage }) => {
  await homePage.goto('https://www.sharp.com/');
  await homePage.findADoctorButton.click();
});
```

## Reusable Components (DRY UI)

Use components when **the same UI appears on 2+ pages** (e.g. login, header, footer).

### Creating a component

- Location: `components/` (e.g. `components/Login.component.js`).
- Signature: `(page, root?)` where `root` scopes the component to a modal/section.

```javascript
export class LoginComponent {
  constructor(page, root) {
    this.page = page;
    this.root = root ?? page;
  }

  get loginButton() {
    return this.root.getByRole('link', { name: 'Login / Register' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### Using a component in a page object

```javascript
import { Base } from './Base.page.js';
import { LoginComponent } from '../components/Login.component.js';

export class ZeroConfig extends Base {
  constructor(page) {
    super(page);
    this.login = new LoginComponent(this.page);
  }
}
```

If the component lives inside a modal/section, pass a root locator:

```javascript
this.login = new LoginComponent(this.page, this.page.locator('#login-modal'));
```

### Using a component in a test

Use the component through the fixture:

```javascript
import { test, expect } from '../../util/fixtures';

test('main login button is visible', async ({ zeroConfigPage }) => {
  await expect(zeroConfigPage.login.loginButton).toBeVisible();
});
```

## When to Refactor into a Component

Create a component in `components/` when:

- The same block of UI (same selectors + behaviors) appears in more than one page object, **or**
- You are about to copy-paste selectors/actions between page objects.

Otherwise, keep the logic inside the single page object.
