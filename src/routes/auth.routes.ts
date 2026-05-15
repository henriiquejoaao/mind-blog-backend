import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router(); // cria o roteador de autenticação

authRoutes.post("/register", register); // rota para cadastro de usuário
authRoutes.post("/login", login); // rota para login de usuário
authRoutes.get("/me", authMiddleware, (request, response) => {
  return response.json({
    userId: request.userId
  });
});

export { authRoutes }; // exporta as rotas para serem usadas no server.ts