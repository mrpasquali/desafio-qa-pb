import { Locator, Page } from '@playwright/test';

/**
 * Header do site: menu principal (versão desktop), ícone de busca e botão de contato.
 */
export class HeaderComponent {
  readonly page: Page;
  readonly header: Locator;
  readonly menuDesktop: Locator;
  readonly cta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header#masthead');
    // O site tem duas cópias do menu; #primary-menu é a da versão desktop.
    this.menuDesktop = page.locator('#primary-menu');
    this.cta = this.header.locator('.cta');
  }

  /** Item de primeiro nível do menu (ex.: "Nossas soluções", "Sobre"). */
  itemDoMenu(nome: string): Locator {
    return this.menuDesktop
      .locator(':scope > li')
      .filter({ has: this.page.getByRole('link', { name: nome, exact: true }) });
  }

  /** Submenu que abre ao clicar no item de primeiro nível. */
  submenu(nome: string): Locator {
    return this.itemDoMenu(nome).locator(':scope > ul.sub-menu');
  }

  async abrirMenu(nome: string): Promise<void> {
    await this.itemDoMenu(nome).getByRole('link', { name: nome, exact: true }).first().click();
  }

  get iconeDeBusca(): Locator {
    return this.cta.locator('a.link-search');
  }

  get botaoFaleComEspecialista(): Locator {
    return this.cta.locator('a.btn-cta');
  }
}