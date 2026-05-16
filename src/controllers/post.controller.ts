import { Request, Response } from "express"; // tipos do Express para requisição e resposta
import { prisma } from "../lib/prisma"; // prisma para acessar o banco

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
      }
    },
    orderBy: {
      createdAt: "desc" // ordena os artigos do mais recente para o mais antigo
    }
  });

  return response.json(posts);
}

// controller responsável por buscar um artigo específico pelo id
async function getPostById(request: Request, response: Response) {
  const { id } = request.params; // pega o id enviado pela URL

  const post = await prisma.post.findUnique({
    where: {
    id: Number(id) // converte o id da URL de string para number
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado." // retorna not found, pois não foi encontrado o artigo
    });
  }

  return response.json(post); // retorna o JSON do artigo
}

// controller responsável por criar um novo artigo
async function createPost(request: Request, response: Response) {
  const { title, content, banner } = request.body; // recebe os dados do artigo pelo body do request

  if (!title || !content) {
    return response.status(400).json({
      message: "Título e conteúdo são obrigatórios." // retorna bad request, pois o título e o conteúdo do artigo são inválidos
    });
  }

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado." // retorna unauthorized, pois o usuário não está autenticado
    })
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      banner,
      authorId: request.userId // associa o artigo ao usuário autenticado
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return response.status(201).json(post); // retorna created e o JSON do artigo
}

// controller responsável por atualizar um artigo existente
async function updatePost(request: Request, response: Response) {
  const { id } = request.params; // pega o id da URL
  const { title, content, banner } = request.body; // recebe os dados atualizados

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado." // retorna unauthorized, pois o usuário não está autenticado
    })  
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado." // retorna not found, pois o artigo não foi encontrado
    })
  }

  if (post.authorId !== request.userId) {
    return response.status(403).json({
      message: "Você não tem permissão para editar este artigo." // retorna forbbiden, pois o usuário não é o autor do artigo
    });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      title,
      content,
      banner
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return response.json(updatedPost); // retorna o JSON do artigo atualizado
}

// criação da função que remove um artigo existente
async function deletePost(request: Request, response: Response) {
  const { id } = request.params; // pega o id da URL

  if (!request.userId) {
    return response.status(401).json({
      message: "Usuário não autenticado." // retorna unauthorized, pois o usuário não está autenticado
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!post) {
    return response.status(404).json({
      message: "Artigo não encontrado." // retorna not found, pois o artigo não foi encontrado
    })
  }

  if (post.authorId !== request.userId) {
    return response.status(403).json({
      message: "Você não tem permissão para remover este artigo." // retorna forbbiden, pois o usuário não é o autor do artigo
    })
  }

  await prisma.post.delete({
    where: {
      id: Number(id)
    }
  });

  return response.status(204).send();
}

export { listPosts, getPostById, createPost, updatePost, deletePost };