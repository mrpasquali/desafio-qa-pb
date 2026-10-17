import { Locator, Page } from '@playwright/test';

/** Nome do campo na tela → data-name do campo no Contact Form 7. */
const CAMPOS: Record<string, string> = {
  Nome: 'your-name',
  Empresa: 'company',
  'E-mail corporativo': 'your-email',
  Telefone: 'phone',
  Website: 'your-site',
};

/**
 * Página de contato (/pt-br/suporte/) e o formulário "Fale com um especialista".
 * O formulário é do Contact Form 7; os campos são localizados pelo data-name,
 * porque os rótulos não estão ligados aos campos (sem id no <input>).
 */
export class ContatoPage {
  readonly page: Page;
  readonly formulario: Locator;
  readonly checkboxMarketing: Locator;
  readonly avisos: Locator;
  readonly mensagemDeResumo: Locator;
  readonly mensagemDeSucesso: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formulario = page.locator('.suporte-options-form form.wpcf7-form').filter({ visible: true });
    this.checkboxMarketing = this.formulario.locator('[data-name="autorizacao-checkbox"] input[type="checkbox"]');
    this.avisos = this.formulario.locator('.wpcf7-not-valid-tip');
    this.mensagemDeResumo = this.formulario.locator('.wpcf7-response-output');
    this.mensagemDeSucesso = page.locator('.suporte-options-sent');
  }

  /** Cartão de uma das opções da página (ex.: a opção de e-commerce). */
  opcao(titulo: string): Locator {
    // O título é quebrado em vários elementos; a expressão aceita qualquer espaçamento entre as palavras.
    const palavras = titulo.trim().split(/\s+/).map(escapeRegex);
    return this.page.locator('li.item-3').filter({ hasText: new RegExp(palavras.join('\\s*'), 'i') });
  }

  textoDoCheckbox(texto: string): Locator {
    return this.formulario.locator('[data-name="autorizacao-checkbox"]').getByText(texto, { exact: false });
  }

  avisoDoCampo(campo: string): Locator {
    const dataName = CAMPOS[campo];
    if (!dataName) throw new Error(`Campo desconhecido: "${campo}"`);
    return this.formulario.locator(`[data-name="${dataName}"] .wpcf7-not-valid-tip`);
  }

  botao(nome: string): Locator {
    return this.formulario.getByRole('button', { name: nome });
  }
}

function escapeRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}