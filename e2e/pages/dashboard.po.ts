import { Locator, Page, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly logo: Locator;
  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.getByTestId('app-nav-logo');
  }

  async goto() {
    await this.page.goto('/dashboard');
    await expect(this.logo).toBeVisible();
  }
}
