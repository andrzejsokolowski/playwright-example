import { test, expect } from '../fixtures/Fixtures';
test.beforeEach(async ({ dashboard }) => {
  await dashboard.goto();
});

test('dashboard basic test @smoke', async ({ dashboard }) => {
  await expect(dashboard.logo).toBeVisible();
});
