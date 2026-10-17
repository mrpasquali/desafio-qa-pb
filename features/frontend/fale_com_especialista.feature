# language: pt

@cenario-4 @fale-com-especialista
Funcionalidade: Formulário "Fale com um especialista"
  Como lojista que tem um e-commerce
  Quero falar com um especialista da PagBrasil
  Para saber qual é a melhor solução de pagamentos para a minha loja

  Contexto:
    Dado que estou na página inicial da PagBrasil
    E acessei a página de contato pelo botão "Fale com um especialista" do header
    E abri o formulário pelo link "Entrar em contato" da opção "Fale com um especialista em pagamentos para e-commerce"

  @funcional @divergencia
  Cenário: Não exibir avisos ao marcar o checkbox de comunicações de marketing
    Quando eu marco o checkbox "Desejo receber conteúdos, novidades e comunicações de marketing da PagBrasil por e-mail e/ou WhatsApp."
    Então o aviso "Campo obrigatório" não deve ser exibido em nenhum campo

  @funcional @smoke
  Cenário: Exibir avisos de campo obrigatório com o checkbox de comunicações de marketing marcado
    Dado que marquei o checkbox "Desejo receber conteúdos, novidades e comunicações de marketing da PagBrasil por e-mail e/ou WhatsApp."
    Quando eu clico em "Continuar" sem preencher os campos
    Então o aviso "Campo obrigatório" deve ser exibido nos campos:
      | Nome               |
      | Empresa            |
      | E-mail corporativo |
      | Telefone           |
      | Website            |

  @funcional
  Cenário: Exibir a mensagem de resumo ao continuar com os campos vazios
    Quando eu clico em "Continuar" sem preencher os campos
    Então a mensagem "Preencha os campos obrigatórios" deve ser exibida

  @funcional
  Cenário: Exibir avisos de campo obrigatório sem marcar o checkbox de comunicações de marketing
    Dado que o checkbox "Desejo receber conteúdos, novidades e comunicações de marketing da PagBrasil por e-mail e/ou WhatsApp." está desmarcado
    Quando eu clico em "Continuar" sem preencher os campos
    Então o aviso "Campo obrigatório" deve ser exibido nos campos:
      | Nome               |
      | Empresa            |
      | E-mail corporativo |
      | Telefone           |
      | Website            |