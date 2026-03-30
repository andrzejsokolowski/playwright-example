import { test } from '../fixtures/base-fixture';

test.beforeEach(async ({ dashboard }) => {
  await dashboard.goto();
});

test('some test example', async ({ dashboard }) => {
  await dashboard.switchToMode('classic');
});
