import { expect } from '@playwright/test';
import { DataTable } from 'playwright-bdd';
import { Given, Then, When } from '../fixtures';

Given('acessei a página de contato pelo botão {string} do header', async ({ page, header }, botao: string) => {
  await expect(header.botaoFaleComEspecialista).toHaveText(botao);
  await header.botaoFaleComEspecialista.click();
  await expect(page).toHaveURL(/\/pt-br\/suporte\//);
});

Given(
  'abri o formulário pelo link {string} da opção {string}',
  async ({ contato }, link: string, opcao: string) => {
    // Se o clique acontecer antes de o JavaScript da página estar pronto, o formulário não abre.
    // O toPass repete o bloco (clicar e conferir) até o formulário aparecer.
    await expect(async () => {
      await contato.opcao(opcao).getByRole('link', { name: link }).click();
      await expect(contato.formulario).toBeVisible({ timeout: 3_000 });
    }).toPass({ timeout: 20_000 });
  },
);

const marcarCheckbox = async (contato: import('../../pages/ContatoPage').ContatoPage, texto: string) => {
  await expect(contato.textoDoCheckbox(texto)).toBeVisible();
  // O checkbox é estilizado; o <input> real pode ficar escondido atrás do desenho.
  await contato.checkboxMarketing.check({ force: true });
  await expect(contato.checkboxMarketing).toBeChecked();
};

When('eu marco o checkbox {string}', async ({ contato }, texto: string) => {
  await marcarCheckbox(contato, texto);
});

Given('que marquei o checkbox {string}', async ({ contato }, texto: string) => {
  await marcarCheckbox(contato, texto);
});

Given('que o checkbox {string} está desmarcado', async ({ contato }, texto: string) => {
  await expect(contato.textoDoCheckbox(texto)).toBeVisible();
  await expect(contato.checkboxMarketing).not.toBeChecked();
});

When('eu clico em {string} sem preencher os campos', async ({ contato }, botao: string) => {
  // Os campos ficam vazios: a validação bloqueia o envio e nenhum contato é registrado.
  await contato.botao(botao).click();
});

Then('o aviso {string} não deve ser exibido em nenhum campo', async ({ contato }, aviso: string) => {
  await expect(contato.avisos).toHaveCount(0);
  await expect(contato.formulario.getByText(aviso, { exact: true })).toHaveCount(0);
});

Then('o aviso {string} deve ser exibido nos campos:', async ({ contato }, aviso: string, tabela: DataTable) => {
  for (const [campo] of tabela.raw()) {
    await expect(contato.avisoDoCampo(campo), `aviso no campo "${campo}"`).toHaveText(aviso);
  }
  // Prova de que nada foi enviado: nenhuma mensagem de sucesso está visível.
  // (A página tem duas: a do formulário e a do popup de newsletter.)
  await expect(contato.mensagemDeSucesso.filter({ visible: true })).toHaveCount(0);
});

Then('a mensagem {string} deve ser exibida', async ({ contato }, mensagem: string) => {
  await expect(contato.mensagemDeResumo).toHaveText(mensagem);
});