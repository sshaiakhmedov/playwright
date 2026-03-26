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

## Guidelines & Rules

*** MUST DO: ***
1. **Create/extend a page object** in `pages/` (or reuse an existing one).
2. **Use fixtures** from `util/fixtures.js` instead of raw `@playwright/test`.
3. Try to use `beforeEach` or `beforeAll` hooks if needed.
4. Use the browser tool to explore the DOM before writing any locators.
5. use `.env` file for environment variables.
6. read constants from `constants/` or `data/` folder as per the case.
7. use page objects from `pages/` folder.
8. use components from `components/` folder.
9. If new spec implies new Page Object, Component, Fixture, Constant, Data, or Locator, create it in the appropriate folder.

*(Note: For generic anti-patterns like "No locators/constants in specs", refer to the global `AGENTS.md` rules.)*

## Execution Workflow

For the exact step-by-step procedure to execute when creating a new UI test, see:
- Run `/create-ui-test` (located in `.agents/workflows/create-ui-test.md`)

## Example Test

```javascript
import { test, expect } from '../../util/fixtures';

test('example', async ({ homePage }) => {
  await homePage.goto('https://www.sharp.com/');
  await expect(homePage.page).toHaveTitle(/Sharp/);
});
```

Prefer **`getByRole` / user-centric locators** in page objects and components; keep raw CSS in `locator()` as a last resort.
