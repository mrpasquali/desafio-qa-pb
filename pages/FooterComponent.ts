import { Locator, Page } from '@playwright/test';

/**
 * Rodapé do site: selo GPTW, cidades, seletor de idioma e chamada de contato.
 */
export class FooterComponent {
  readonly page: Page;
  readonly seloGptw: Locator;
  readonly cidades: Locator;
  readonly seletorDeIdioma: Locator;
  readonly chamadaDeContato: Locator;

  constructor(page: Page) {
    this.page = page;
    this.seloGptw = page.locator('svg.gptw-logo').filter({ visible: true });
    this.cidades = page.locator('.cities li');
    // O seletor de idioma também existe no menu mobile (escondido no desktop);
    // o filtro mantém só o que está visível, ou seja, o do rodapé.
    this.seletorDeIdioma = page.locator('ul.languages').filter({ visible: true });
    this.chamadaDeContato = page.locator('.block-contato p');
  }

  cidade(nome: string): Locator {
    return this.cidades.filter({ hasText: new RegExp(`^\\s*${escapeRegex(nome)}\\s*$`) });
  }

  get idiomaAtivo(): Locator {
    return this.seletorDeIdioma.locator('li.active');
  }

  opcaoDeIdioma(sigla: string): Locator {
    return this.seletorDeIdioma.getByRole('link', { name: sigla, exact: true });
  }
}

function escapeRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}