import { expect } from '@playwright/test';
import { Given, When } from '../fixtures';

Given('que estou na página inicial da PagBrasil', async ({ page }) => {
  await page.goto('/pt-br/');
});

Given('que estou na página inicial da PagBrasil em português', async ({ page }) => {
  await page.goto('/pt-br/');
  await expect(page.locator('html')).toHaveAttribute('lang', /^pt-br$/i);
});

When('eu abro o menu {string}', async ({ header }, menu: string) => {
  await header.abrirMenu(menu);
  await expect(header.submenu(menu)).toBeVisible();
});

When('eu acesso a página {string} pelo menu {string}', async ({ page, header }, pagina: string, menu: string) => {
  const enderecoAnterior = page.url();
  await header.abrirMenu(menu);
  await header.submenu(menu).getByRole('link', { name: pagina, exact: true }).click();
  await page.waitForURL((url) => url.href !== enderecoAnterior);
  await page.waitForLoadState('domcontentloaded');
});