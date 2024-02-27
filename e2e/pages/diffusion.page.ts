import { Locator, Page, expect } from '@playwright/test';

export class DiffusionPage {
  readonly page: Page;
  private readonly logo: Locator;
  readonly promptBox: Locator;
  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.locator('#logo');
    this.promptBox = this.page.locator('#prompt');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.logo).toBeVisible();
  }
}
