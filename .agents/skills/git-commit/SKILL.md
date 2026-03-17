---
name: git-commit
description: Guidelines on how to stage and commit changes after writing and successfully running UI or API tests. Use this skill ONLY when the user explicitly asks you to save or commit your work to version control.
---

# Git Commit Guidelines

## Overview

After writing a new test (UI or API) or updating an existing one, you MUST WAIT for the user to review the changes. ONLY apply these guidelines and commit the changes when the user explicitly asks you to save or commit the work.

## Workflow

1. **Verify Tests Pass**: Before staging anything, ensure all modified tests pass successfully locally. (Note: A Husky pre-commit hook is configured to run `test:ui` if UI files are staged, and `test:api` if API files are staged. The commit will be aborted if they fail).
2. **Review Changes**: Review what files have been modified or created (`git status`, `git diff`). Make sure you didn't accidentally leave any hardcoded locators, credentials, or `.only` blocks in your test.
3. **Stage Specific Files**: Use `git add <file>` to stage only the files related to the current logical change. Avoid `git add .` unless you are absolutely sure of everything that is changed.
4. **Write a Meaningful Commit Message**: 
    - The message should start with a short (<= 50 chars) summary in the imperative mood (e.g., `Add login negative test`, `Update find a doctor locator`).
    - Optionally, add a blank line and a longer description if the change is complex.
5. **Commit**: Use `git commit -m "Your precise message"`.
6. **Push**: Unless specified otherwise, always push the changes to the remote repository using `git push`.

## Example

```bash
# 1. Check status
git status

# 2. Add only the files you worked on
git add pages/Login.page.js tests/login.spec.js

# 3. Commit with a clear, imperative message
git commit -m "Add negative login test scenarios"

# 4. Push the changes
git push
```

## MANDATORY CHECKLIST

Before committing/pushing, verify:
- [ ] The test runs successfully locally.
- [ ] Global `AGENTS.md` rules are followed (no `test.only`, no `page.waitForTimeout`, etc.).
- [ ] The commit message accurately reflects the changes.
- [ ] The commit is pushed to the remote repository.
