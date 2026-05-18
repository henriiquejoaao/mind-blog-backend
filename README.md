# Mind Blog - Backend

Backend do projeto **Mind Blog**, uma API REST desenvolvida para uma plataforma de artigos de tecnologia.

A aplicação permite autenticação de usuários, criação e gerenciamento de artigos, upload de imagens, curtidas, visualizações e comentários.

## 🔗 Repositórios

- Frontend: `https://github.com/henriiquejoaao/mind-blog-frontend`
- Backend: `https://github.com/henriiquejoaao/mind-blog-backend`

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- JWT
- bcrypt
- Multer
- CORS
- dotenv

## 📌 Funcionalidades

### Usuários

- Cadastro de usuário
- Login de usuário
- Senha criptografada com bcrypt
- Autenticação via JWT

### Artigos

- Listagem de artigos
- Busca de artigo por ID
- Criação de artigo autenticada
- Edição de artigo autenticada
- Exclusão de artigo autenticada
- Upload de imagem de capa
- Remoção de imagem de capa
- Resumo do artigo
- Categoria do artigo
- Tags do artigo
- Conteúdo em Markdown

### Interações

- Registro real de visualizações
- Curtida em artigo
- Remoção de curtida
- Impedimento de múltiplas curtidas pelo mesmo usuário no mesmo artigo
- Comentários em artigos
- Listagem de comentários por artigo
- Exclusão de comentários pelo autor do comentário ou pelo autor do artigo

## 🎁 Melhorias extras implementadas

Além do escopo principal, foram adicionadas funcionalidades extras consideradas bônus:

- Sistema real de curtidas
- Sistema real de comentários
- Sistema real de visualizações
- Contadores reais com Prisma `_count`
- Metadata dos posts:
  - resumo
  - categoria
  - tags
- Upload de imagens com Multer
- Remoção de banner
- Validações de permissão para editar/excluir artigos
- Validação para impedir curtidas duplicadas
- Dump do banco incluído no repositório

## 📁 Estrutura principal

```txt
src
├── controllers
│   ├── auth.controller.ts
│   └── post.controller.ts
├── lib
│   └── prisma.ts
├── middlewares
│   ├── auth.middleware.ts
│   └── upload.middleware.ts
├── routes
│   ├── auth.routes.ts
│   └── post.routes.ts
└── server.ts

prisma
└── schema.prisma

database
└── dump.sql
```

## 🗄️ Banco de dados

O projeto utiliza **MySQL** com **Prisma ORM**.

O dump do banco deve estar incluído no repositório em:

```txt
database/dump.sql
```

Esse arquivo pode ser usado para importar a estrutura e os dados iniciais do banco.

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone COLOQUE_AQUI_O_LINK_DO_REPOSITORIO_BACKEND
```

### 2. Acesse a pasta do projeto

```bash
cd backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

Exemplo:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/mind_blog"
JWT_SECRET="mind_blog_secret"
PORT=3333
```

### 5. Crie o banco de dados

No MySQL, crie o banco:

```sql
CREATE DATABASE mind_blog;
```

### 6. Importe o dump do banco

Com o MySQL instalado, rode:

```bash
mysql -u root -p mind_blog < database/dump.sql
```

Caso prefira gerar as tabelas via Prisma, rode:

```bash
npx prisma migrate dev
```

### 7. Gere o Prisma Client

```bash
npx prisma generate
```

### 8. Rode o backend

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3333
```

## 🔐 Autenticação

Rotas protegidas exigem token JWT no header:

```txt
Authorization: Bearer SEU_TOKEN
```

## 📌 Rotas principais

### Auth

#### Criar usuário

```http
POST /auth/register
```

Body:

```json
{
  "name": "João Teste",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### Posts

#### Listar artigos

```http
GET /posts
```

#### Buscar artigo por ID

```http
GET /posts/:id
```

#### Criar artigo

```http
POST /posts
```

Rota protegida.

Tipo: `multipart/form-data`

Campos:

```txt
title
summary
category
tags
content
banner
```

#### Editar artigo

```http
PUT /posts/:id
```

Rota protegida.

Tipo: `multipart/form-data`

Campos:

```txt
title
summary
category
tags
content
banner
removeBanner
```

#### Excluir artigo

```http
DELETE /posts/:id
```

Rota protegida.

---

### Visualizações

#### Registrar visualização

```http
POST /posts/:id/view
```

---

### Curtidas

#### Curtir artigo

```http
POST /posts/:id/like
```

Rota protegida.

#### Remover curtida

```http
DELETE /posts/:id/like
```

Rota protegida.

---

### Comentários

#### Listar comentários de um artigo

```http
GET /posts/:id/comments
```

#### Criar comentário

```http
POST /posts/:id/comments
```

Rota protegida.

Body:

```json
{
  "content": "Comentário de teste"
}
```

#### Excluir comentário

```http
DELETE /posts/comments/:commentId
```

Rota protegida.

## 🧬 Models principais

### User

- id
- name
- email
- password
- createdAt

### Post

- id
- title
- summary
- content
- banner
- category
- tags
- views
- createdAt
- updatedAt
- authorId

### Like

- id
- userId
- postId
- createdAt

### Comment

- id
- content
- userId
- postId
- createdAt

## 📝 Observações finais

Este repositório contém apenas o backend.

Para testar a aplicação completa, rode também o frontend.