import { test as base, createBdd } from 'playwright-bdd';
import { HeaderComponent } from '../pages/HeaderComponent';
import { FooterComponent } from '../pages/FooterComponent';
import { ContatoPage } from '../pages/ContatoPage';

/** Dados compartilhados entre os passos de um mesmo cenário de backend. */
type RespostaHttp = {
  status?: number;
  duracaoMs?: number;
};

type Fixtures = {
  header: HeaderComponent;
  footer: FooterComponent;
  contato: ContatoPage;
  resposta: RespostaHttp;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    // O banner de cookies pode cobrir os elementos da página.
    // Sempre que ele aparecer, os cookies não essenciais são recusados e o teste continua.
    await page.addLocatorHandler(page.getByText('Aceitar cookies', { exact: true }), async () => {
      await page.getByText('Rejeitar', { exact: true }).first().click();
    });
    await use(page);
  },
  header: async ({ page }, use) => use(new HeaderComponent(page)),
  footer: async ({ page }, use) => use(new FooterComponent(page)),
  contato: async ({ page }, use) => use(new ContatoPage(page)),
  resposta: async ({}, use) => use({}),
});

export const { Given, When, Then } = createBdd(test);