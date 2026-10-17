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
    // Sempre que ele aparecer, o banner é fechado pelo botão "Aceitar cookies" e o teste continua.
    const aceitarCookies = page.getByRole('button', { name: 'Aceitar cookies', exact: true });
    await page.addLocatorHandler(aceitarCookies, async () => {
      await aceitarCookies.click();
    });
    await use(page);
  },
  header: async ({ page }, use) => use(new HeaderComponent(page)),
  footer: async ({ page }, use) => use(new FooterComponent(page)),
  contato: async ({ page }, use) => use(new ContatoPage(page)),
  resposta: async ({}, use) => use({}),
});

export const { Given, When, Then } = createBdd(test);