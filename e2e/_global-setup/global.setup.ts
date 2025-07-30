import path from 'path';
import { expect, test as setup } from '@playwright/test';
setup.use({ headless: true });
setup('Login to CRM', async ({ baseURL, request }) => {
  console.log(baseURL);
  if (!baseURL) {
    throw new Error('baseURL is not defined');
  }

  const creds = `username=${process.env['E2E_USERNAME']}&password=${process.env['E2E_PASSWORD']}`;
  const res = await request.post(`${baseURL}/auth/login`, {
    data: creds,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  expect(res.status()).toBe(200);

  await request.storageState({
    path: path.join(__dirname, '../auth/user.json'),
  });
});
