import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({ path: '.env.development.local' });

const onCI = !!process.env['CI'];
const baseURL = process.env['E2E_BASE_URL'];
const generateAllure = !!process.env['GENERATE_ALLURE'];

export default defineConfig({
  grepInvert: onCI ? /@noCI/ : undefined, // Ignore @noCI annotated tests in Pipe
  globalTeardown: require.resolve('./_global-teardown/global-teardown.ts'),
  fullyParallel: false,
  retries: onCI ? 1 : 0,
  workers: onCI ? 2 : 1,
  timeout: 120_000,
  expect: { timeout: 20_000 },

  reporter: generateAllure
    ? [
        ['list'],
        [
          'allure-playwright',
          { resultsDir: path.join(__dirname, './allure-results') },
        ],
      ]
    : [
        ['list'],
        ['html', { outputFolder: path.join(__dirname, './test-output') }],
      ],
  use: {
    baseURL: baseURL,
    trace: onCI ? 'retain-on-first-failure' : 'on',
    headless: onCI,
    actionTimeout: 15000,
    navigationTimeout: 25000,
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-dts',
  },

  outputDir: path.join(__dirname, 'test-output'),
  projects: [
    {
      name: 'login-crm',
      testDir: path.join(__dirname, '_global-setup'),
      testMatch: /global\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    {
      name: 'crm',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'auth', 'user.json'),
        actionTimeout: 20000,
        navigationTimeout: 40000,
        testIdAttribute: 'data-dts',
      },
      dependencies: ['login-crm'],
    },
  ],
});
