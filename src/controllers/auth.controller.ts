import { Request, Response } from "express"; // tipos do Express para requisição e resposta
import bcrypt from "bcrypt"; // bcrypt para criptografar senhas
import { prisma } from "../lib/prisma"; // prisma para acessar o banco
import jwt from "jsonwebtoken"; // biblioteca para gerar e validar tokens JWT

// controller responsável pelo cadastro de usuários
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
      message: "Este email já está em uso." // retorna bad request porque o email já está em uso
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
    select: { // seleciona apenas os campos seguros que serão devolvidos na resposta
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });

  return response.status(201).json(user); // retorna created com a criação do usuário
}

// controller responsável pelo login de usuários
async function login(request: Request, response: Response) {
  const { email, password } = request.body; // recebe email e senha do body do request

  // validação dos dados
  if (!email || !password) {
    return response.status(400).json({
      message: "Email e senha são obrigatórios." // retorna bad request, pois email ou senha não foram enviados
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email // busca do usuário pelo email
    }
  });

  if (!user) { // se não for encontrado usuário
    return response.status(401).json({
      message: "Email ou senha inválidos." // retorna unauthorized, pois o usuário não existe no banco
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password); // comparação da senha fornecida com a senha criptografada no banco

  if (!passwordMatches) { // se a senha não corresponder
    return response.status(401).json({
      message: "Email ou senha inválidos" // retorna unauthorized, pois a senha fornecida não é igual a senha criptografada pelo banco
    });
  }

  if (!process.env.JWT_SECRET) { // valida se a chave secreta usada para assinar o JWT foi definida no .env
    return response.status(500).json({
      message: "JWT_SECRET não configurado no servidor." // retorna internal server error, pois a chave secreta não foi configurada
    });
  }

  // geração do token JWT
  const token = jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  });
}

export { register, login };