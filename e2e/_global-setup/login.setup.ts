import path from 'path';
import { expect, test as setup } from '../fixtures/base-fixture';

setup.use({ headless: true });
setup('Login via API', async ({ baseURL, request }) => {
  if (!baseURL) {
    throw new Error('baseURL is not defined, please define it in playwright config');
  }

  const creds = JSON.stringify({
    username: process.env['E2E_USERNAME'],
    password: process.env['E2E_PASSWORD'],
  });

  const res = await request.post(`${baseURL}/login`, {
    data: creds,
  });

  expect(res.status()).toBe(200);

  await request.storageState({
    path: path.join(__dirname, '../auth/user.json'),
  });
});

setup('Login via UI', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login();
});
