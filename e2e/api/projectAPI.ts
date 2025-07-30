import { APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ClientAPI } from './client-api';

export class ProjectAPI {
  readonly request: APIRequestContext;
  readonly user;
  readonly currentCookies: string;

  readonly clients: ClientAPI;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.user = this.getUser();
    this.currentCookies = this.extractCookies(this.user.cookies);
    this.clients = new ClientAPI(request, this.currentCookies);
  }

  // Method to get the user (circumvent ts compilation from importing a non-existent file)
  private getUser() {
    const filePath = path.join(__dirname, './../auth/user.json');

    const data = fs.readFileSync(filePath, 'utf-8');
    if (!data) {
      throw new Error('bad user.json file');
    }
    const jsonData = JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return jsonData;
  }

  private extractCookies(cookiesArray: { name: string; value: string }[]): string {
    return cookiesArray.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
  }
}
