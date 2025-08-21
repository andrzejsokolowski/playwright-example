import { APIRequestContext } from '@playwright/test';

import { ClientAPI } from './client-api';
import { JsonPlaceholderAPI } from './jsonplaceholder-api';

export class ProjectAPI {
  readonly request: APIRequestContext;
  readonly currentCookies: string;
  readonly clients: ClientAPI;
  readonly jsonplaceholder: JsonPlaceholderAPI;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.clients = new ClientAPI(request, this.currentCookies);
    this.jsonplaceholder = new JsonPlaceholderAPI(request);
  }
}
