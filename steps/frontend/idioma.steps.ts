import { expect } from '@playwright/test';
import { DataTable } from 'playwright-bdd';
import { Then, When } from '../fixtures';

When('eu navego até o rodapé da página', async ({ footer }) => {
  await footer.seletorDeIdioma.scrollIntoViewIfNeeded();
});

Then('o seletor de idioma deve ser exibido', async ({ footer }) => {
  await expect(footer.seletorDeIdioma).toBeVisible();
});

Then('o idioma {string} deve estar marcado como ativo', async ({ footer }, sigla: string) => {
  await expect(footer.idiomaAtivo).toHaveText(sigla);
});

When('eu seleciono o idioma {string} no rodapé', async ({ page, footer }, sigla: string) => {
  await footer.opcaoDeIdioma(sigla).scrollIntoViewIfNeeded();
  await footer.opcaoDeIdioma(sigla).click();
  await page.waitForLoadState('domcontentloaded');
});

Then('o idioma da página deve ser {string}', async ({ page }, idioma: string) => {
  // O site usa "pt-br" e "en-US"; a comparação não diferencia maiúsculas de minúsculas.
  await expect(page.locator('html')).toHaveAttribute('lang', new RegExp(`^${idioma}$`, 'i'));
});

Then('os textos devem ser exibidos em inglês:', async ({ header, footer }, tabela: DataTable) => {
  for (const { local, texto } of tabela.hashes()) {
    switch (local) {
      case 'menu principal':
        await expect(header.menuDesktop.getByRole('link', { name: texto, exact: true })).toBeVisible();
        break;
      case 'botão do header':
        await expect(header.botaoFaleComEspecialista).toHaveText(texto);
        break;
      case 'rodapé':
        await expect(footer.chamadaDeContato).toHaveText(texto);
        break;
      default:
        throw new Error(`Local desconhecido na tabela: "${local}"`);
    }
  }
});