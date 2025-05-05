

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Running the tests](#tests)
- [Running custom report](#allure)
- [Built Using](#built_using)


## 🧐 About <a name = "about"></a>

Demo project based on Sharp FAD landing page using Page Object Module

## 🏁 Getting Started <a name = "getting_started"></a>

```
npm clone https://github.com/sshaiakhmedov/playwright.git
```

### Installing <a name = "installing"></a>

```
npm install
```
#
## 🔧 Running the tests <a name = "tests"></a>

To run tests use Command line using pre-defined script
```
npm run pw
```
OR
```
npx playwright test
```
passing required flags, please refer to https://playwright.dev/docs/intro#command-line for more flags.

#
## Running custom report <a name = "allure"></a>
Run Allure-playwright reporter
```
npm run allure
```
which generates `allure-results` folder and spin up the server with the last run results

#
## ⛏️ Built Using <a name = "built_using"></a>

- [Playwright](https://www.mongodb.com/) - e2e Framework
- [Allure](https://expressjs.com/) - Custom Reporter

#
## Setting up AWS CodeBuild + GitHub
- TBD

#
## AWS CodeBuild
- it runs on github actions - Pull Requests and commits
- can run with overrides in AWS Console


