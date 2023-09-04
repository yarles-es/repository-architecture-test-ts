Teste de Nova Arquitetura com TypeScript
Este projeto, denominado test-new-architecture-ts, é uma exploração do Padrão de Repositório em TypeScript. Ele foi projetado para demonstrar uma arquitetura limpa usando ferramentas e práticas modernas.

Ferramentas e Bibliotecas Utilizadas
TypeScript: Um superconjunto do JavaScript que adiciona tipos estáticos.
Express: Um framework web rápido, descomplicado e minimalista para Node.js.
MongoDB: Um driver de banco de dados NoSQL para Node.js.
Validator: Uma biblioteca de validadores e saneadores de strings.
Dotenv: Módulo sem dependências que carrega variáveis de ambiente de um arquivo .env.
Nodemon: Uma utilidade que monitora quaisquer mudanças em seu código-fonte e reinicia automaticamente o servidor.
ESLint & Prettier: Ferramentas de lint e formatação de código para garantir qualidade e consistência no código.
ts-node: Execução TypeScript e REPL para Node.js.
... e mais. Verifique o package.json para obter uma lista completa das dependências e devDependencies.

Instalação
Clone o Repositório:

bash
Copy code
git clone https://github.com/yarles-es/test-new-architecture-ts.git
Navegue até o Diretório do Projeto:

bash
Copy code
cd test-new-architecture-ts
Instale as Dependências:

bash
Copy code
npm install
Inicie o Servidor de Desenvolvimento:

bash
Copy code
npm run start:dev
Isso iniciará o servidor usando nodemon e ts-node, o que significa que qualquer alteração que você fizer nos arquivos fonte reiniciará automaticamente o servidor.

Sobre a Arquitetura
O projeto utiliza o Padrão de Repositório, que é um padrão de design que separa a lógica que recupera os dados e os mapeia para o modelo de entidade da lógica de negócios que atua no modelo. Essa separação proporciona uma arquitetura mais limpa e promove o princípio da responsabilidade única.

Problemas e Contribuições
Se você encontrar algum problema ou gostaria de contribuir para o projeto, por favor abra uma issue no GitHub.

Licença
Este projeto está licenciado sob a Licença ISC.
