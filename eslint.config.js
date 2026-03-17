import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: [
      'playwright-report/**',
      'allure-results/**',
      'allure-report/**',
      'test-results/**',
      'playwright-report-docker/**',
      'allure-results-docker/**',
      'test-results-docker/**',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  playwright.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
    braceStyle: '1tbs',
  }),
  {
    rules: {
      'no-unused-vars': 'warn',
      'playwright/expect-expect': 'off', // Optional: you can enable this if you want to require expect in every test
      'playwright/no-skipped-test': 'off', // You use .skip for CI/CD bypassing
    },
  },
];
