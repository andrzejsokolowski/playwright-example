import { test as base } from '@playwright/test';
import { DiffusionPage } from '../pages/diffusion.page';
type DiffusionFixtures = {
  diffusionPage: DiffusionPage;
};

export const test = base.extend<DiffusionFixtures>({
  diffusionPage: async ({ page }, use) => {
    await use(new DiffusionPage(page));
  },
});

export { expect } from '@playwright/test';
