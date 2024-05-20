import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.po';
import { PageObjectCommon } from '../pages/common/common.po';

type Fixtures = {
  common: PageObjectCommon;
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
