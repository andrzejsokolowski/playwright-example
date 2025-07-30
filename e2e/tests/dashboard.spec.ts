import { test, expect } from '../fixtures/base-fixture';
test.beforeEach(async ({ dashboard }) => {
  await dashboard.goto();
});

test('dashboard basic test @smoke', async ({ dashboard }) => {
  await expect(dashboard.logo).toBeVisible();
});

test('testAPI', async ({ api }) => {
  const client = await api.clients.createClient();
});
