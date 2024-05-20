import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginInput = this.page.getByPlaceholder('Login');
    this.passwordInput = this.page.getByPlaceholder('Password');
  }

  async login(baseURL: string) {
    await this.page.goto(baseURL);
    await expect(this.loginButton).toBeVisible();
    await this.loginInput.fill('login here');
    await this.passwordInput.fill('pass here');
    await this.loginButton.click();
    await expect(this.loginButton).not.toBeVisible();
    // make sure that it's logged in with assert here
  }
}
