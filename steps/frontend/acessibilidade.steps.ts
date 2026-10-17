import { expect } from '@playwright/test';
import { Then } from '../fixtures';

Then('o selo GPTW do rodapé deve ser identificado como imagem', async ({ footer }) => {
  await footer.seloGptw.scrollIntoViewIfNeeded();
  await expect(footer.seloGptw).toHaveRole('img');
});

Then('o nome acessível do selo GPTW deve conter {string}', async ({ footer }, nome: string) => {
  await expect(footer.seloGptw).toHaveAccessibleName(new RegExp(nome, 'i'));
});