# language: pt

@backend @status-code
Funcionalidade: Status code das páginas dos cenários
  Como visitante do site da PagBrasil
  Quero que as páginas visitadas nos cenários de teste respondam corretamente
  Para conseguir navegar pelo site e entrar em contato com a empresa

  @funcional @smoke
  Esquema do Cenário: Responder 200 na página "<pagina>"
    Quando eu faço uma requisição GET para "<caminho>"
    Então o status code da resposta deve ser 200

    Exemplos:
      | cenario                      | pagina                   | caminho                                     |
      | 1 - Nossas Soluções          | Gateway                  | /pt-br/servicos/gateway/                    |
      | 1 - Nossas Soluções          | Pix Automático           | /pt-br/metodos-de-pagamento/pix-automatico/ |
      | 1 - Nossas Soluções          | PagBrasil.JS             | /pt-br/integracao/                          |
      | 1 - Nossas Soluções          | PagBrasil Checkout       | /pt-br/lp/pagbrasil-checkout/               |
      | 2 - Quem Somos               | Quem somos               | /pt-br/sobre-nos/                           |
      | 3 - Alteração de Idioma      | Página inicial em inglês | /?preferred_language=en                     |
      | 4 - Fale com um especialista | Contato                  | /pt-br/suporte/                             |