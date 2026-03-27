---
description: Step-by-step process for writing and running a Playwright UI test
---

# Create UI Test Workflow

When writing a new UI Spec or test, follow these exact steps:

1. **Explore the DOM**:
   - Use the browser tool to explore the DOM and find robust locators before writing them.
   - Prefer `getByRole` / user-centric locators.

2. **Setup Architecture**:
   - Check if the page exists in `pages/`. Provide a new or extend an existing Page Object.
   - Check if a `components/` object is needed for shared UI.
   - Check if `constants/` or `data/` should be created/updated.
   - Ensure the new page object is registered in `util/fixtures.js`.

3. **Write the Test**:
   - Create the `.spec.js` file in the appropriate project folder under `tests/ui/`.
   - Use fixtures from `util/fixtures.js` instead of raw `@playwright/test`.
   - Use `beforeEach` or `beforeAll` hooks if appropriate.

4. **Generate Scenarios**: Ensure you cover:
   - Happy Path (Core user flow)
   - Negative Path (Validation errors, invalid inputs)
   - State Variations (Empty states, loading states, API failures)
   - Edge/Boundary Cases

5. **Local Run**:
   - Look at `package.json` scripts.
   - Run in **headless** mode first.
   - If headless passes, run in a **headed** mode to visually confirm.

## MANDATORY VERIFICATION CHECKLIST:
- [ ] Global `AGENTS.md` rules are followed (No locators, data, or env vars in specs; Page Objects and Components used correctly).
- [ ] Prioritizing `getByRole()` over any other locator strategy. Order of locator strategies:
   1. getByRole
   2. getByLabel
   3. getByPlaceholder
   4. getByText
   5. getByAltText
   6. getByTitle
   7. getByTestId
