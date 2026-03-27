# Playwright Repository Global AI Rules

These rules apply globally to ALL tasks (UI tests, API tests, fixing bugs, writing page objects, etc.) within this repository. You MUST follow them at all times.

## 1. Strict Anti-Patterns (NEVER DO)
- **NO LOCATORS in spec files:** Locators must be in Page Objects (`pages/`) or Components (`components/`).
- **NO DATA/CONSTANTS in spec files:** Extract test data, URLs, usernames, and string constants to the `data/` or `constants/` directories.
- **NO ENVIRONMENT VARIABLES directly in spec files:** Read `.env` variables in `data/` or `constants/` files instead.
- **NO HARDCODED SENSITIVE INFO:** Never hardcode tokens, passwords, or credentials anywhere, especially in API specs.
- **NO RAW IMPORTS:** Always import `test` and `expect` from `../../util/fixtures` instead of raw `@playwright/test` (unless you are writing a utility that strictly requires the raw import).
- **NO `test.only` OR `test.skip`:** Ensure `test.only` or `test.skip` is removed before finalizing tasks or committing.
- **NO HARDCODED WAITS:** Never use `page.waitForTimeout` in tests.

## 2. Architecture & Patterns (MUST DO)
- **Page Object Model:** All pages must extend `Base` from `pages/Base.page.js` and be placed in `pages/`.
- **DRY UI Components:** Use components from `components/` when the same UI appears on 2+ pages.
- **Fixtures:** Leverage custom fixtures from `util/fixtures.js` for Page Objects and Components.
- **Environment config:** Always use the `.env` file for storing Base URLs, tokens, and API keys.
- **Project-Based Folders:** Organize all test specs into subdirectories within `tests/ui/` or `tests/api/` based on the project/website being tested (e.g., `tests/ui/sharp/`, `tests/ui/demoblaze/`).

### Page Objects Deep Dive

**Pattern**
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

**Wiring into fixtures**
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

### Reusable Components (DRY UI)

Use components when **the same UI appears on 2+ pages** (e.g. login, header, footer).

**Creating a component**
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

**Using a component in a page object**

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

**Using a component in a test**
Use the component through the fixture:

```javascript
import { test, expect } from '../../util/fixtures';

test('main login button is visible', async ({ zeroConfigPage }) => {
  await expect(zeroConfigPage.login.loginButton).toBeVisible();
});
```

**When to Refactor into a Component**
Create a component in `components/` when:
- The same block of UI (same selectors + behaviors) appears in more than one page object, **or**
- You are about to copy-paste selectors/actions between page objects.

Otherwise, keep the logic inside the single page object.

---
*For specific task guidelines, refer to the individual `SKILL.md` files in the `.agents/skills/` directory (e.g., `ui-tests`, `api-tests`, `git-commit`).*
