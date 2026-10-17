# language: pt

@backend @nao-funcional @desempenho
Funcionalidade: Tempo de resposta das páginas dos cenários
  Como visitante do site da PagBrasil
  Quero que as páginas visitadas nos cenários de teste respondam rapidamente
  Para navegar pelo site sem esperar o carregamento

  Esquema do Cenário: Responder em até 2 segundos na página "<pagina>"
    Quando eu faço uma requisição GET para "<caminho>"
    Então a resposta deve chegar em até 2 segundos

    Exemplos:
      | cenario                 | pagina                   | caminho                                     |
      | 1 - Nossas Soluções     | Gateway                  | /pt-br/servicos/gateway/                    |
      | 1 - Nossas Soluções     | Pix Automático           | /pt-br/metodos-de-pagamento/pix-automatico/ |
      | 1 - Nossas Soluções     | PagBrasil.JS             | /pt-br/integracao/                          |
      | 1 - Nossas Soluções     | PagBrasil Checkout       | /pt-br/lp/pagbrasil-checkout/               |
      | 2 - Quem Somos          | Quem somos               | /pt-br/sobre-nos/                           |
      | 3 - Alteração de Idioma | Página inicial em inglês | /?preferred_language=en                     |