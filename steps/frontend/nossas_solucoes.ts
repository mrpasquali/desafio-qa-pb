import { expect } from '@playwright/test';
import { Then } from '../fixtures';

const MENU = 'Nossas soluções';

Then('o item {string} deve ser exibido', async ({ header }, item: string) => {
  await expect(header.submenu(MENU).getByRole('link', { name: item, exact: true })).toBeVisible();
});

Then('o item {string} não deve ser exibido', async ({ header }, item: string) => {
  // Verifica o submenu inteiro, em todas as colunas.
  await expect(header.submenu(MENU).getByRole('link', { name: item, exact: true })).toHaveCount(0);
  await expect(header.submenu(MENU).getByText(item, { exact: true })).toHaveCount(0);
});