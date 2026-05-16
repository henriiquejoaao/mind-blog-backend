import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../controllers/post.controller";

const postRoutes = Router(); // cria o roteador de posts

postRoutes.get("/", listPosts); // lista todos os artigos
postRoutes.get("/:id", getPostById); // busca um artigo pelo id

postRoutes.post("/", authMiddleware, upload.single("banner"), createPost); // cria um artigo com banner, exigindo autenticação

postRoutes.put("/:id", authMiddleware, upload.single("banner"), updatePost); // atualiza um artigo, exigindo autenticação

postRoutes.delete("/:id", authMiddleware, deletePost); // remove um artigo, exigindo autenticação

export { postRoutes }; // exporta as rotas para serem usadas no server.ts