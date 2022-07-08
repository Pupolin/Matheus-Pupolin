# Calculadora

### Funcionalidades

- [x] Acesso de usuário
- [x] Operadores aritiméticos
- [x] Operador parênteses
- [x] Gravação de histórico

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/) e [MariaDB](https://mariadb.org/).

### Preparando a base de dados

- Necessário realizar a instação do MariaDB
- Executar os [Scripts](./Scripts.sql) presentes no projeto
- Para testes, criei um usuário calculadora, mas é possível alterar no arquivo .env

### Rodando o sistema da calculadora (servidor)

```bash
# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

### Tecnologias e frameworks

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [MariaDB](https://mariadb.org/)
- [Express](https://expressjs.com/)
- [Javascript](https://www.javascript.com/)
- [JQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
