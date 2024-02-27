import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: false,
  retries: 0,
  workers: 2,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:9000/',
    trace: 'on-first-retry',
    headless: false,
    actionTimeout: 5000,
    navigationTimeout: 10000,
  },
  outputDir: './e2e/test-output',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
