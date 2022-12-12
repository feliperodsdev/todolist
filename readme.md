 <h1>Projeto Todo List.</h1>

Esse é um projeto pessoal para alavancar meus conhecimentos em desenvolvimento web. Trata-se um Gerenciador De Tarefas feito em React e NodeJS. Utilizei algumas tecnologias como Typescript e ferramentas de encriptação. 

<h2>O que aprendi com esse projeto!</h2>

ReactJS -> Não tinha conhecimentos prévios de React quando iniciei esse projeto, utilizei ele para aprender como funciona essa biblioteca. 

Typescript -> Aproveitando que estava aprendendo ReactJS resolvi aprender Typescript para ter um melhor controle do que estava acontecendo na minha aplicação, acredito que utilizei bem a tecnologia.

<h2>Como funciona a aplicação</h2>

Basicamente, a aplicação contém um sistema de autenticação e quando autenticado o usuário estará apto para criar, concluir e excluir tarefas. 

<h2>Como usar</h2>

Após clonar o respositório, crie as variáveis de ambiente sendo elas: 
    -> URL_DB -- URL, com senha, do banco de dados (Lembrando que utilizei MongoDB)
    -> SECRET_KEY e KEY_VALUE -> (string, number) -- utilizei para encriptação de senhas. 

Após isso basta dar um 'npm start' tanto na pasta raiz do projeto quanto na pasta 'todolist' dentro do projeto, então, estará com o frontend e backend rodando. 

<h2>Endpoints da API</h2>

---------"/login"--------- 

Post -> {
    username: string, 
    password: string
} -> Fazer autenticação do usuário

---------"/user/create"---------  

Post -> {
    user: string, 
    name: string, 
    password: string, 
    confirmPassword: string
} -> Criar usuário

---------"/task/operations"---------

Post -> 
{
    headers: 
    {
        Authorization: Bearer
    }
    body: 
    {
        title: string, 
        content: string, 
        doat: Date, 
        done: Boolean, 
        _id: string
    }
} -> Criar tarefa para o usuário logado

Delete -> 
{
    headers: 
    {
        Authorization: Bearer
    }
    body: 
    {
        _id: string 
    } 
} -> Deleta a tarefa do usuário

Put -> 
{
    headers: 
    {
        Authorization: Bearer
    }
    body: 
    {
        _id: string 
    } 
} -> Deleta a tarefa do usuário

Get -> 
{
    headers: 
    {
        Authorization: Bearer
    }
} -> Retorna todas as tarefas vinculadas ao usuário logado