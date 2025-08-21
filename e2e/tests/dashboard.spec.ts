import { test, expect } from '../fixtures/base-fixture';
test.beforeEach(async ({ dashboard }) => {
  await dashboard.goto();
});

test.skip('dashboard basic test @smoke', async ({ dashboard }) => {
  await expect(dashboard.logo).toBeVisible();
});

test.skip('testAPI', async ({ api }) => {
  const client = await api.clients.createClient();
});
