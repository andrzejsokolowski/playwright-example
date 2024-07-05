import { defineConfig, devices } from '@playwright/test';
import process from 'process';
import path from 'path';

const onCI = !!process.env['CI'];
const baseURL = process.env['E2E_BASE_URL'];

export default defineConfig({
  globalSetup: require.resolve('./global_setup/global.setup.ts'),

  fullyParallel: false,
  retries: onCI ? 1 : 0,
  workers: onCI ? 4 : 2,
  reporter: onCI
    ? 'list'
    : [['list'], ['html', { outputFile: './test-output/report.html' }]],
  use: {
    baseURL: baseURL,
    trace: 'retain-on-failure',
    headless: onCI,
    actionTimeout: 15000,
    navigationTimeout: 15000,
    ignoreHTTPSErrors: true,
  },
  outputDir: path.join(__dirname, 'test-output'),

  projects: [
    {
      name: 'global setup',
      testMatch: /global\.setup\.ts/,
      use: {
        baseURL: baseURL,
        headless: onCI,
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'auth', 'user.json'),
      },
    },
  ],
});
