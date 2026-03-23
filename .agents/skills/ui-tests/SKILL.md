---
name: ui-tests
description: Guidelines on how to write Playwright UI tests, best practices, MUST DO, NEVER DO, MANDATORY CHECKLIST, and how to run tests. Use this when writing or running new UI tests.
---

# UI Test Creation Guidelines

## Required Test Coverage Strategy

When asked to write UI tests for a feature, you MUST generate scenarios covering the following:
1. **Happy Path:** Successful completion of the core user flow (e.g., successful login, successful checkout).
2. **Negative Path:** Form validation errors, invalid credentials, or rejecting incorrect inputs.
3. **State Variations:** Empty states, loading states, interactions with disabled buttons, or handled API failures.
4. **Edge/Boundary Cases:** Boundary values in forms or edge navigation paths.

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

*(Note: For generic anti-patterns like "No locators/constants in specs", refer to the global `AGENTS.md` rules.)*

**MANDATORY VERIFICATION CHECKLIST:** Before finalizing any UI Test implementation, you MUST explicitly go through this checklist and verify it to the user:
   - [ ] Global `AGENTS.md` rules are followed (No locators, data, or env vars in specs; Page Objects and Components used correctly).
   - [ ] Prioritizing `getByRole()` over any other locator strategy. Here is the order of locator strategies:
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
