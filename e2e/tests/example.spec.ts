import { test, expect } from '../fixtures/base-fixture';

test.describe('test group', () => {
  test('test', async ({ loginPage }) => {
     expect(loginPage).toBeDefined();
  });
});
