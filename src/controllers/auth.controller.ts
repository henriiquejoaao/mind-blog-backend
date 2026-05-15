import { Request, Response } from "express"; // tipos do Express para requisição e resposta
import bcrypt from "bcrypt"; // bcrypt para criptografar senhas
import { prisma } from "../lib/prisma"; // prisma para acessar o banco

async function register(request: Request, response: Response) {
  const { name, email, password } = request.body; // recebe a requisição de cadastro

  // validação dos dados
  if (!name || !email || !password) { // confere se algum campo obrigatório está vazio
    return response.status(400).json({
      message: "Nome, email e senha são obrigatórios."
    });
  }

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email // verifica se o email já existe no banco
    }
  });

  if (userAlreadyExists) {
    return response.status(400).json({
      message: "Este email já está em uso." // retorna um bad request porque o email já está em uso
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // criptografa a senha com salt rounds igual a 10

  // criação do usuário
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true // password não é selecionado para não ser devolvido no response
    }
  });

  return response.status(201).json(user);
}

export { register };