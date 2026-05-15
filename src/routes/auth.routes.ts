import { Router } from "express";
import { register } from "../controllers/auth.controller";

const authRoutes = Router(); // cria o roteador de autenticação

authRoutes.post("/register", register); // rota para cadastro de usuário

export { authRoutes }; // exporta as rotas para serem usadas no server.ts