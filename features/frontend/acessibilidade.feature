# language: pt

@frontend @nao-funcional @acessibilidade
Funcionalidade: Acessibilidade do selo GPTW no rodapé
  Como pessoa que usa leitor de tela
  Quero que o selo GPTW do rodapé tenha um nome acessível
  Para saber que a PagBrasil é certificada Great Place to Work

  Contexto:
    Dado que estou na página inicial da PagBrasil

  @falha-conhecida @fail
  Cenário: Anunciar o selo GPTW do rodapé da página "Quem somos" para leitores de tela
    Quando eu acesso a página "Quem somos" pelo menu "Sobre"
    Então o selo GPTW do rodapé deve ser identificado como imagem
    E o nome acessível do selo GPTW deve conter "Great Place to Work"