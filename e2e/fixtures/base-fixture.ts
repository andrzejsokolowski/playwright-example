import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/app1/loginPage/loginPage.po';
import { Dashboard } from '../pages/app1/dashboard/dashboard.po';

type CRMFixtures = {
  loginPage: LoginPage;
  dashboard: Dashboard;
};

export const test = base.extend<CRMFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboard: async ({ page }, use) => {
    await use(new Dashboard(page));
  },
});

export { expect } from '@playwright/test';
