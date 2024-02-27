import { test, expect } from '../fixtures/diffusion';

test('diffusion test', async ({ diffusionPage }) => {
  await diffusionPage.goto(); //should go to 'baseURL/diffusion'
  await expect(diffusionPage.page).toHaveURL('/diffusion');
});
