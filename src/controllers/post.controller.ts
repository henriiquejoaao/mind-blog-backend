import { Request, Response } from "express"; // tipos do Express para requisição e resposta
import { prisma } from "../lib/prisma"; // prisma para acessar o banco

// converte id de string para number e valida se é um número válido
function parseId(id: string) {
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return null;
  }

  return numericId;
}

// controller responsável por listar todos os artigos cadastrados
async function listPosts(request: Request, response: Response) {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return response.json(posts);
}

// controller responsável por buscar um artigo específico pelo id
async function getPostById(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  return response.json(post);
}

// controller responsável por criar um novo artigo
async function createPost(request: Request, response: Response) {
  const { title, summary, content, category, tags } = request.body ?? {};
  const banner = request.file ? `/uploads/${request.file.filename}` : undefined;

  if (!title || !summary || !content || !category) {
    return response.status(400).json({
      message: "Título, resumo, categoria e conteúdo são obrigatórios."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  const post = await prisma.post.create({
    data: {
      title,
      summary,
      content,
      category,
      tags,
      banner,
      authorId: request.userId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });

  return response.status(201).json(post);
}

// controller responsável por atualizar um artigo existente
async function updatePost(request: Request, response: Response) {
  const { id } = request.params;
  const { title, summary, content, category, tags, removeBanner } =
    request.body ?? {};
  const banner = request.file ? `/uploads/${request.file.filename}` : undefined;

  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  if (!title || !summary || !content || !category) {
    return response.status(400).json({
      message: "Título, resumo, categoria e conteúdo são obrigatórios."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  if (post.authorId !== request.userId) {
    return response.status(403).json({
      message: "Você não tem permissão para editar este artigo."
    });
  }

  const shouldRemoveBanner = removeBanner === "true";

  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title,
      summary,
      content,
      category,
      tags,
      ...(banner && { banner }),
      ...(shouldRemoveBanner && { banner: null })
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });

  return response.json(updatedPost);
}

// controller responsável por remover um artigo existente
async function deletePost(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  if (post.authorId !== request.userId) {
    return response.status(403).json({
      message: "Você não tem permissão para remover este artigo."
    });
  }

  await prisma.post.delete({
    where: {
      id: postId
    }
  });

  return response.status(204).send();
}

// controller responsável por registrar uma visualização no artigo
async function viewPost(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      views: {
        increment: 1
      }
    },
    select: {
      id: true,
      views: true
    }
  });

  return response.json(updatedPost);
}

// controller responsável por curtir um artigo
async function likePost(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: request.userId,
        postId
      }
    }
  });

  if (existingLike) {
    return response.status(400).json({
      message: "Você já curtiu este artigo."
    });
  }

  const like = await prisma.like.create({
    data: {
      userId: request.userId,
      postId
    }
  });

  return response.status(201).json(like);
}

// controller responsável por remover a curtida de um artigo
async function unlikePost(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: request.userId,
        postId
      }
    }
  });

  if (!existingLike) {
    return response.status(404).json({
      message: "Curtida não encontrada."
    });
  }

  await prisma.like.delete({
    where: {
      userId_postId: {
        userId: request.userId,
        postId
      }
    }
  });

  return response.status(204).send();
}

// controller responsável por listar comentários de um artigo
async function listComments(request: Request, response: Response) {
  const { id } = request.params;
  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return response.json(comments);
}

// controller responsável por criar comentário em um artigo
async function createComment(request: Request, response: Response) {
  const { id } = request.params;
  const { content } = request.body ?? {};

  const postId = parseId(id);

  if (!postId) {
    return response.status(400).json({
      message: "Id do artigo inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  if (!content || !content.trim()) {
    return response.status(400).json({
      message: "O comentário não pode estar vazio."
    });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado."
    });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      userId: request.userId,
      postId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return response.status(201).json(comment);
}

// controller responsável por excluir um comentário
async function deleteComment(request: Request, response: Response) {
  const { commentId } = request.params;
  const numericCommentId = parseId(commentId);

  if (!numericCommentId) {
    return response.status(400).json({
      message: "Id do comentário inválido."
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado."
    });
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: numericCommentId
    },
    include: {
      post: true
    }
  });

  if (!comment) {
    return response.status(404).json({
      message: "Comentário não encontrado."
    });
  }

  const isCommentOwner = comment.userId === request.userId;
  const isPostOwner = comment.post.authorId === request.userId;

  if (!isCommentOwner && !isPostOwner) {
    return response.status(403).json({
      message: "Você não tem permissão para excluir este comentário."
    });
  }

  await prisma.comment.delete({
    where: {
      id: numericCommentId
    }
  });

  return response.status(204).send();
}

export {
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
};