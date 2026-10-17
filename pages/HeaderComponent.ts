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

  /**
   * Link de primeiro nível do menu (ex.: "Nossas soluções", "Sobre").
   * O link termina com o ícone da setinha, que entra no nome acessível
   * ("Nossas soluções "); por isso o nome é comparado ignorando o que vem
   * depois do texto, desde que não sejam letras ou números.
   */
  linkDoMenu(nome: string): Locator {
    return this.menuDesktop
      .locator(':scope > li > a')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegex(nome)}\\W*$`) });
  }

  /** Item de primeiro nível do menu (o <li> com o link e o submenu). */
  itemDoMenu(nome: string): Locator {
    return this.linkDoMenu(nome).locator('xpath=..');
  }

  /** Submenu que abre ao clicar no item de primeiro nível. */
  submenu(nome: string): Locator {
    return this.itemDoMenu(nome).locator(':scope > ul.sub-menu');
  }

  async abrirMenu(nome: string): Promise<void> {
    await this.linkDoMenu(nome).click();
  }

  get iconeDeBusca(): Locator {
    return this.cta.locator('a.link-search');
  }

  get botaoFaleComEspecialista(): Locator {
    return this.cta.locator('a.btn-cta');
  }
}

function escapeRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}