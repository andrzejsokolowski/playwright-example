import { test, expect } from '../fixtures/diffusion';

test('diffusion test', async ({ diffusionPage }) => {
  await diffusionPage.goto();
  await diffusionPage.page.pause(); //debug
  await expect(diffusionPage.promptBox).toHaveText('a photograph of an astronaut riding a horse');
});
