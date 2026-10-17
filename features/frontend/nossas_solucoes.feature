# language: pt

@cenario-1 @nossas-solucoes
Funcionalidade: Menu "Nossas soluções"
  Como visitante do site da PagBrasil
  Quero consultar as soluções no menu "Nossas soluções"
  Para conhecer os produtos oferecidos pela empresa

  Contexto:
    Dado que estou na página inicial da PagBrasil

  @funcional @smoke
  Esquema do Cenário: Exibir o item "<item>" no menu "Nossas soluções"
    Quando eu abro o menu "Nossas soluções"
    Então o item "<item>" deve ser exibido

    Exemplos:
      | item               |
      | Gateway            |
      | Pix Automático     |
      | PagBrasil.JS       |
      | PagBrasil Checkout |

  @funcional @negativo
  Esquema do Cenário: Não exibir o item "<item>" no menu "Nossas soluções"
    Quando eu abro o menu "Nossas soluções"
    Então o item "<item>" não deve ser exibido

    Exemplos:
      | item                   |
      | PEC Flash              |
      | Transferência Bancária |