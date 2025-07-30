import { APIRequestContext } from '@playwright/test';

import { randomString } from '../fixtures/code-helpers';
import { ResourcePool } from './resource-pool';

export class ClientAPI {
  readonly request: APIRequestContext;
  readonly currentCookies: string;
  private resourcePool: ResourcePool;

  constructor(request: APIRequestContext, currentCookies: string) {
    this.request = request;
    this.currentCookies = currentCookies;
    this.resourcePool = ResourcePool.getInstance();
  }

  async createClient(): Promise<{
    name: string;
    clientId: string;
  }> {
    //send clients as random strings for other tests
    const updatedClient = { name: randomString('client') };
    const req = await this.request.post(`/api/crm/clients/`, {
      data: JSON.stringify(updatedClient),
      headers: {
        'Content-Type': 'text/plain',
        Cookie: this.currentCookies,
      },
    });

    if (req.status() !== 200 && req.status() !== 201) {
      throw new Error(`failure: ${req.status()} ${req.statusText()} - ${JSON.stringify(await req.json())}`);
    }
    const { clientId, name } = await req.json();
    this.resourcePool.addResource(clientId, 'client'); // Add client ID to pool
    return {
      clientId,
      name,
    };
  }
}
