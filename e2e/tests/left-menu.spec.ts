import { test } from '../fixtures/Fixtures';

test.describe('Left menu tests', () => {
  test.beforeEach(async ({ dashboard }) => {
    await dashboard.goto();
  });

  test('left menu basic test', async ({ common }) => {
    await common.leftMenu.selectCategory('clients', 'new-client');
  });
});
