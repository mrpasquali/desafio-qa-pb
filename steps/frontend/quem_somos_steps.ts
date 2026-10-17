import { expect } from '@playwright/test';
import { Then } from '../fixtures';

Then('o ícone de busca deve ser exibido no header', async ({ header }) => {
  await expect(header.iconeDeBusca).toBeVisible();
});

// A linha do tempo é localizada pelo título, e não pela classe,
// para que a verificação da classe seja um teste de verdade.
const linhaDoTempo = (page: import('@playwright/test').Page) =>
  page.locator('section').filter({ has: page.locator('h5', { hasText: 'linha do tempo' }) });

Then('a linha do tempo deve ser exibida', async ({ page }) => {
  await expect(linhaDoTempo(page)).toBeVisible();
});

Then('a linha do tempo deve possuir a classe {string}', async ({ page }, classe: string) => {
  await expect(linhaDoTempo(page)).toHaveClass(new RegExp(`(^|\\s)${classe}(\\s|$)`));
});

Then('o ícone GPTW deve ser exibido no rodapé', async ({ footer }) => {
  await footer.seloGptw.scrollIntoViewIfNeeded();
  await expect(footer.seloGptw).toBeVisible();
});

Then('a cidade {string} deve ser exibida no rodapé', async ({ footer }, cidade: string) => {
  await footer.cidade(cidade).scrollIntoViewIfNeeded();
  await expect(footer.cidade(cidade)).toBeVisible();
});