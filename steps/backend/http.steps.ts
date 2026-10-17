import { expect } from '@playwright/test';
import { Then, When } from '../fixtures';

// Requisições diretas ao servidor, com o "request" do Playwright, sem abrir o navegador.
When('eu faço uma requisição GET para {string}', async ({ request, resposta, $testInfo }, caminho: string) => {
  const inicio = Date.now();
  const res = await request.get(caminho);
  // A resposta só é entregue depois que o corpo inteiro é recebido.
  resposta.duracaoMs = Date.now() - inicio;
  resposta.status = res.status();

  $testInfo.annotations.push(
    { type: 'status', description: String(resposta.status) },
    { type: 'tempo de resposta', description: `${resposta.duracaoMs} ms` },
  );
});

Then('o status code da resposta deve ser {int}', async ({ resposta }, esperado: number) => {
  expect(resposta.status).toBe(esperado);
});

Then('a resposta deve chegar em até {int} segundos', async ({ resposta }, segundos: number) => {
  expect(resposta.duracaoMs).toBeLessThanOrEqual(segundos * 1000);
});