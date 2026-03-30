import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButtonDirectory: Locator;
  private readonly loginButtonMatrix: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = this.page.locator('#username');
    this.passwordInput = this.page.locator('#password');
    this.loginButtonDirectory = this.page.locator('#kc-login');
    this.loginButtonMatrix = this.page.locator('#kc-efecte-login');
  }

  async goto() {
    await this.page.goto('./');
    await expect(this.loginInput).toBeVisible();
  }

  async login({ username = process.env['E2E_USERNAME'], password = process.env['E2E_PASSWORD'] } = {}) {
    await expect(this.loginButtonDirectory).toBeVisible();

    await this.loginInput.click();
    await this.loginInput.fill(username);
    await this.passwordInput.click();

    await this.passwordInput.fill(password);

    //longer timeout here - two of the login steps that may lag.
    await expect(this.loginButtonDirectory).not.toBeVisible({ timeout: 20000 });

    await expect(this.page.locator('#search-field')).toBeVisible({ timeout: 40000 }); //ensure we're logged in with a selector
  }
}
