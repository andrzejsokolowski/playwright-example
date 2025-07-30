import { ResourcePool } from '../api/resource-pool';
import { request, APIRequestContext } from '@playwright/test'; // Import the request module directly
import { ProjectAPI } from '../api/projectAPI';
import path from 'path';

const baseURL = process.env['E2E_BASE_URL'];
export default async function globalTeardown() {
  console.log('Tearing down...');
  const resourcePool = ResourcePool.getInstance();
  const resources = resourcePool.getResources();
  console.log('current resources: \n', resources);

  // Create a new API request context
  const requestContext: APIRequestContext = await request.newContext({
    storageState: path.join(__dirname, '../auth/user.json'),
    ignoreHTTPSErrors: true,
  });
  const projectAPI = new ProjectAPI(requestContext);

  for (const resource of resources) {
    let url: string;
    let method = 'DELETE';
    switch (resource.type) {
      case 'client':
        //cannot delete clients (yet)
        method = 'pass';
        url = `/api/crm/clients/${resource.id}`;
        break;
      default:
        url = 'pass';
        break;
      //add more when adding new resource types
    }

    let text = `Deleting resource: ${resource.type} with ID ${resource.id}...`;
    let response;
    if (method !== 'pass') {
      if (method === 'DELETE') {
        response = await requestContext.delete(baseURL + url, {
          headers: {
            Cookie: projectAPI.currentCookies,
          },
        });
      } else if (method === 'PUT') {
        // Fetch the existing resource data
        const getResponse = await requestContext.get(baseURL + url, {
          headers: {
            Cookie: projectAPI.currentCookies,
          },
        });

        if (!getResponse.ok()) {
          console.log(`Failed to fetch resource: ${resource.type} with ID ${resource.id}`);
          continue;
        }

        const resourceData = await getResponse.json();

        // Update the 'deleted' property
        resourceData.deleted = true;

        // Send the updated data back to the server
        response = await requestContext.put(baseURL + url, {
          data: resourceData,
          headers: {
            'Content-Type': 'application/json',
            Cookie: projectAPI.currentCookies,
          },
        });
      }

      if (!response.ok()) {
        console.log();
        text = text + ` ❌ Failed! ${response.status()}- ${await response.text()}`;
      } else {
        text = text + ' deleted.';
      }
      console.log(text);
    }
  }

  resourcePool.clearPool();

  // Dispose of the request context
  await requestContext.dispose();
}
