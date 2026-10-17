# language: pt

@cenario-3 @idioma
Funcionalidade: Alteração de idioma do site
  Como visitante estrangeiro do site da PagBrasil
  Quero alterar o idioma do site para o inglês pelo rodapé
  Para entender as informações sobre as soluções da empresa

  Contexto:
    Dado que estou na página inicial da PagBrasil em português

  @funcional @smoke
  Cenário: Exibir a opção de idioma no rodapé com o português ativo
    Quando eu navego até o rodapé da página
    Então o seletor de idioma deve ser exibido
    E o idioma "Pt" deve estar marcado como ativo

  @funcional @smoke @acessibilidade
  Cenário: Alterar o idioma da página para inglês
    Quando eu seleciono o idioma "En" no rodapé
    Então o idioma da página deve ser "en-US"
    E os textos devem ser exibidos em inglês:
      | local           | texto                      |
      | menu principal  | Our solutions              |
      | botão do header | Talk to our team           |
      | rodapé          | Do you want to learn more? |