# Mind Blog - Backend

Backend desenvolvido para o case de estágio da Mind Group.

A API permite cadastro e login de usuários, autenticação com JWT, CRUD de artigos e upload de imagem banner para os posts.

## Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- bcrypt
- JWT
- Multer

## Funcionalidades

- Cadastro de usuários
- Login de usuários
- Criptografia de senha com bcrypt
- Autenticação com JWT
- CRUD de artigos
- Upload local de imagem banner
- Relacionamento entre usuário e artigo

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/mind_blog"
PORT=3333
JWT_SECRET="sua_chave_secreta"
```

### 3. Criar o banco de dados

No MySQL:

```sql
CREATE DATABASE mind_blog;
```

### 4. Rodar as migrations

```bash
npx prisma migrate dev
```

### 5. Iniciar o servidor

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3333
```

## Rotas principais

### Autenticação

```txt
POST /auth/register
POST /auth/login
```

### Artigos

```txt
GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
DELETE /posts/:id
```

As rotas de criação, edição e remoção de artigos exigem token JWT no header:

```txt
Authorization: Bearer token
```

## Upload de imagens

As imagens dos banners são salvas localmente na pasta:

```txt
uploads/
```

E podem ser acessadas por:

```txt
http://localhost:3333/uploads/nome-do-arquivo
```