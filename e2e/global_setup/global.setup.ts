import { LoginPage } from '../pages/loginPage.po';
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
//find a way to initialize this value beforehand. require('dotenv').config(); was something I used once.
// const baseURL = process.env['E2E_BASE_URL'];
const baseURL = 'https://localhost:9999/';
async function globalSetup() {
  console.log('global setup started');

  //check if user login state exists
  const userPath = path.join(__dirname, '..', 'auth', 'user.json');
  if (!fs.existsSync(userPath)) {
    console.log('global setup didn`t find a user state - Logging in');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const pageAsLogin = new LoginPage(page);
    //try catch for debugging tracing if fail
    try {
      await context.tracing.start({ screenshots: true, snapshots: true });
      await pageAsLogin.page.goto(baseURL);
      await pageAsLogin.login(baseURL);
      await context.storageState({ path: userPath });
      console.log('saved storage state');
      await context.tracing.stop({
        path: './../test-output/setup-trace.zip',
      });
      await browser.close();
    } catch (error) {
      await context.tracing.stop({
        path: './../test-output/failed-setup-trace.zip',
      });
      await browser.close();
      throw error;
    }
  }
  console.log('global setup finished');
}

export default globalSetup;
