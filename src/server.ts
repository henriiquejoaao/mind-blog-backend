import express from "express"; // express para criar a API
import cors from "cors"; // permite que o frontend acesse a API em outra porta/domínio
import dotenv from "dotenv"; // dotenv para ler o .env
import { authRoutes } from "./routes/auth.routes";
import { postRoutes } from "./routes/post.routes";
import path from "path";

// configuração inicial da aplicação
dotenv.config(); // carrega o arquivo .env
const app = express(); // cria a aplicação Express (objeto principal do servidor)
app.use(cors()); // ativa o CORS 
app.use(express.json()); // permite a API entender o body dos requests (JSON)
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads"))); // permite acessar publicamente as imagens salvas na pasta uploads
app.use("/auth", authRoutes); // registra as rotas de autenticação
app.use("/posts", postRoutes); // registra as rotas de artigos

// rota de teste para verificar o funcionamento da API
app.get("/", (request, response) => {
  return response.json({
    message: "API Mind Blog rodando!"
  });
});

const PORT = process.env.PORT || 3333; // usa a porta do .env ou 3333 como padrão

// inicialização do servidor
app.listen(PORT, () => { // inicia o servidor e faz ele escutar requisições nessa porta
  console.log(`Servidor rodando na porta ${PORT}`);
});