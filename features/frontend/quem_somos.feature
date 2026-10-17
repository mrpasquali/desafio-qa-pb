# language: pt

@cenario-2 @quem-somos
Funcionalidade: Página "Quem somos"
  Como visitante do site da PagBrasil
  Quero acessar a página "Quem somos" pelo menu "Sobre"
  Para conhecer a história e as informações institucionais da empresa

  Contexto:
    Dado que estou na página inicial da PagBrasil

  @funcional @smoke @header
  Cenário: Exibir o ícone de busca no header da página "Quem somos"
    Quando eu acesso a página "Quem somos" pelo menu "Sobre"
    Então o ícone de busca deve ser exibido no header

  @funcional @smoke @linha-do-tempo
  Cenário: Exibir a linha do tempo da PagBrasil
    Quando eu acesso a página "Quem somos" pelo menu "Sobre"
    Então a linha do tempo deve ser exibida
    E a linha do tempo deve possuir a classe "block-quem-somos-timeline"

  @funcional @rodape
  Cenário: Exibir o ícone GPTW no rodapé da página "Quem somos"
    Quando eu acesso a página "Quem somos" pelo menu "Sobre"
    Então o ícone GPTW deve ser exibido no rodapé

  @funcional @rodape
  Esquema do Cenário: Exibir a cidade "<cidade>" no rodapé da página "Quem somos"
    Quando eu acesso a página "Quem somos" pelo menu "Sobre"
    Então a cidade "<cidade>" deve ser exibida no rodapé

    Exemplos:
      | cidade       |
      | Porto Alegre |
      | São Paulo    |
      | Barcelona    |
      | Singapura    |