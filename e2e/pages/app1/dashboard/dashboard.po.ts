import { Locator, Page, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  private readonly switchModeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.switchModeBtn = this.page.locator('.switch-button');
  }

  async goto() {
    await this.page.goto('./');
    await expect(this.switchModeBtn).toBeVisible();
  }

  async switchToMode(mode: 'agent' | 'classic') {
    await expect(this.switchModeBtn).toBeVisible();
    const currentMode = (await this.switchModeBtn.textContent()).split(' ')[0].toLowerCase();

    if (currentMode === mode) {
      return;
    }

    await this.switchModeBtn.click();
    await expect(this.switchModeBtn).toContainText(mode.toUpperCase());
  }
}
