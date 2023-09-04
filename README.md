
# Teste de Nova Arquitetura com TypeScript

Este projeto, denominado `test-new-architecture-ts`, é uma exploração do Padrão de Repositório em TypeScript. Ele foi projetado para demonstrar uma arquitetura limpa usando ferramentas e práticas modernas.

## 🛠 Ferramentas e Bibliotecas Utilizadas

- **TypeScript**: Um superconjunto do JavaScript que adiciona tipos estáticos.
- **Express**: Um framework web rápido, descomplicado e minimalista para Node.js.
- **MongoDB**: Um driver de banco de dados NoSQL para Node.js.
- **Validator**: Uma biblioteca de validadores e saneadores de strings.
- **Dotenv**: Módulo sem dependências que carrega variáveis de ambiente de um arquivo `.env`.
- **Nodemon**: Uma utilidade que monitora quaisquer mudanças em seu código-fonte e reinicia automaticamente o servidor.
- **ESLint & Prettier**: Ferramentas de lint e formatação de código para garantir qualidade e consistência no código.
- **ts-node**: Execução TypeScript e REPL para Node.js.

... e mais. Verifique o `package.json` para obter uma lista completa das dependências e devDependencies.

## 🚀 Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/yarles-es/test-new-architecture-ts.git

2. **Navegue até o Diretório do Projeto:**
   ```bash
   cd test-new-architecture-ts

3. **Utilizando Docker:**
Se você tem o Docker e o docker-compose instalados, pode iniciar o projeto usando o seguinte comando:
    ```bash
   docker-compose up
Isso iniciará todos os serviços definidos no docker-compose.yml, incluindo o banco de dados MongoDB e a aplicação.

5. **Instale as Dependências:**
   ```bash
   npm install
   
6. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run start:dev

Isso iniciará o servidor usando nodemon e ts-node, o que significa que qualquer alteração que você fizer nos arquivos fonte reiniciará automaticamente o servidor.

## 📚 Sobre a Arquitetura

O projeto utiliza o Padrão de Repositório, que é um padrão de design que separa a lógica que recupera os dados e os mapeia para o modelo de entidade da lógica de negócios que atua no modelo. Essa separação proporciona uma arquitetura mais limpa e promove o princípio da responsabilidade única.

## 🐞 Problemas e Contribuições

Se você encontrar algum problema ou gostaria de contribuir para o projeto, por favor [abra uma issue](https://github.com/yarles-es/test-new-architecture-ts/issues) no GitHub.
