import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginInput = this.page.getByPlaceholder('Login');
    this.passwordInput = this.page.getByPlaceholder('Hasło');
    this.loginButton = this.page.locator('.dds-button-success');
  }

  async login({
    baseURL = process.env['E2E_BASE_URL'],
    password = process.env['E2E_PASSWORD'],
    username = process.env['E2E_USERNAME'],
  } = {}) {
    await this.page.goto(baseURL);
    await expect(this.loginButton).toBeVisible({ timeout: 40000 });
    const passwordRemindText = this.page.locator(
      '.dds-login__credentials-form-help-password'
    );
    await passwordRemindText.waitFor({ state: 'visible', timeout: 20000 });
    if (!((await passwordRemindText.textContent()) === 'Nie pamiętam hasła')) {
      console.log('setting language to PL');
      await this.page.getByRole('combobox').click();
      await this.page.getByRole('combobox').selectOption('pl');
    }
    await expect(passwordRemindText).toHaveText('Nie pamiętam hasła');

    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    //longer timeout here - two of the login steps that may lag.
    await expect(this.loginButton).not.toBeVisible({ timeout: 40000 });
    await expect(
      this.page.getByRole('button', { name: 'Ustawienia' }).first(),
      {
        message: 'locator might be broken?',
      }
    ).toBeVisible({ timeout: 40000 });
  }
}
