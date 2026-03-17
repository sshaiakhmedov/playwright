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

---
*For specific task guidelines, refer to the individual `SKILL.md` files in the `.agents/skills/` directory (e.g., `ui-tests`, `api-tests`, `git-commit`, `structure`).*
