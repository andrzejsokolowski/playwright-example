import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.po';
import { Dashboard } from '../pages/dashboard.po';
import { ProjectAPI } from '../api/projectAPI';

type CRMFixtures = {
  api: ProjectAPI;
  loginPage: LoginPage;
  dashboard: Dashboard;
};

export const test = base.extend<CRMFixtures>({
  api: async ({ request }, use) => {
    await use(new ProjectAPI(request));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboard: async ({ page }, use) => {
    await use(new Dashboard(page));
  },
});

export { expect } from '@playwright/test';
