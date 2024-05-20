import { Locator, Page, expect } from '@playwright/test';

export class PageObjectCommon {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }

}
