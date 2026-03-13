---
name: api-tests
description: Guidelines on how to write API tests using Playwright's APIRequestContext. Use this when adding or updating API test specs to ensure correctness and maintainability.
---

# API Test Creation Guidelines

## Overview

Playwright can be used for API testing alongside UI testing via the built-in `request` fixture, which provides an `APIRequestContext`. When writing API tests, we want to maintain separation of concerns and reusability.

## How to Add a new API Spec

*** FLOW: ***
   1. go over the MUST DO and NEVER DO sections.
   2. go over the MANDATORY VERIFICATION CHECKLIST.
   3. go over the FINAL CHECK.

*** MUST DO: ***
1. **Use `request` fixture** instead of third-party libraries: `test('api test', async ({ request }) => { ... })`.
2. **Extract Payloads/Data:** If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` folder.
3. **Use API Helpers/Clients:** If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper in an `api/` or `clients/` folder.
4. **Environment Variables:** Use the `.env` file for storing Base URLs, tokens, and API keys. Fetch them via `process.env`.
5. **Use correct assertions:** Use Playwright's `expect` assertions (e.g., `expect(response.ok()).toBeTruthy()`, `expect(response.status()).toBe(200)`).

*** NEVER DO THE FOLLOWING: ***
1. Never hardcode tokens or sensitive credentials in the API spec.
2. Never store massive JSON payloads directly inside the `test()` block.
3. Never chain UI interactions in the same test block as a pure API test unless you are specifically testing UI-API boundaries (in which case, it's an E2E test, not an API test).

**MANDATORY VERIFICATION CHECKLIST:** Before finalizing any API Test implementation, you MUST explicitly go through this checklist and verify it to the user:
   - [ ] No hardcoded tokens/passwords in the spec.
   - [ ] Request bodies/Complex parameters are extracted to `data/` or generated via factory functions.
   - [ ] API endpoints are stored as constants or read from config if they change between environments.
   - [ ] Using `expect(response.ok()).toBeTruthy()` or explicitly checking the `status()` before checking the response JSON.
   - [ ] Descriptive variable names for parsed body data (e.g., `const userData = await response.json();` not `const data = ...`).

## Example Usage

```javascript
import { test, expect } from '@playwright/test';
// OR import { test, expect } from '../../util/fixtures'; if wrapping request

test('fetch user data returns 200', async ({ request }) => {
  const response = await request.get(`${process.env.API_BASE_URL}/users/1`);
  expect(response.ok()).toBeTruthy();
  
  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
});
```
