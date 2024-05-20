import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  globalSetup: require.resolve('./global_setup/global.setup.ts'),
  fullyParallel: false,
  retries: 0,
  workers: 2,
  reporter: [['list'], ['html', { outputFile: './test-output/report.html' }]],
  use: {
    baseURL: 'https://d1crm1.localhost:8090/dashboard',
    trace: 'retain-on-first-failure',
    headless: false,
    actionTimeout: 5000,
    navigationTimeout: 10000,
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-dts',
  },
  outputDir: './test_output',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'auth', 'user.json'),
      },
    },
  ],
});
