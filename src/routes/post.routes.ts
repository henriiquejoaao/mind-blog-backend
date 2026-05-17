import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  viewPost,
  likePost,
  unlikePost,
  listComments,
  createComment,
  deleteComment
} from "../controllers/post.controller";

const postRoutes = Router();

postRoutes.get("/", listPosts);
postRoutes.post("/", authMiddleware, upload.single("banner"), createPost);

postRoutes.delete("/comments/:commentId", authMiddleware, deleteComment);

postRoutes.post("/:id/view", viewPost);

postRoutes.post("/:id/like", authMiddleware, likePost);
postRoutes.delete("/:id/like", authMiddleware, unlikePost);

postRoutes.get("/:id/comments", listComments);
postRoutes.post("/:id/comments", authMiddleware, createComment);

postRoutes.get("/:id", getPostById);
postRoutes.put("/:id", authMiddleware, upload.single("banner"), updatePost);
postRoutes.delete("/:id", authMiddleware, deletePost);

export { postRoutes };