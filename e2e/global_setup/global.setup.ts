import { LoginPage } from '../pages/loginPage.po';
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';


const baseURL = process.env['E2E_BASE_URL'];
const onCI = !!process.env['CI'];

async function globalSetup() {
  console.log('global setup started');

  //check if user login state exists
  const userPath = path.join(__dirname, '..', 'auth', 'user.json');

  if (!fs.existsSync(userPath)) {

    console.log('global setup didn`t find a user state - Logging in');
    const browser = await chromium.launch({ headless: onCI });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const pageAsLogin = new LoginPage(page);

    try {
      if (!baseURL) {
        throw new Error('Base url is not set! Check env variables.');
      }
      await context.tracing.start({ screenshots: true, snapshots: true });
      await pageAsLogin.page.goto(baseURL);
      console.log('logging in...');
      await pageAsLogin.login(baseURL);
      await context.storageState({ path: userPath });
      console.log('saved storage state');
      await context.tracing.stop();
      await browser.close();
      console.log('logging in done. Saving storage state.');
    } catch (error) {
      await context.tracing.stop({
        path: path.join(
          __dirname,
          '/../test-output/global-setup/failed-setup-trace.zip'
        ),
      });
      await browser.close();
      throw error;
    }
  }

  console.log('global setup finished');
}

export default globalSetup;
