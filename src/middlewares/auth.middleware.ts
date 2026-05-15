import { Request, Response, NextFunction } from "express"; // tipos do Express
import jwt from "jsonwebtoken"; // biblioteca para validar o token JWT

interface TokenPayload {
  userId: number; // formato esperado do payload salvo dentro do token
}

// middleware responsável por verificar se o usuário está autenticado
async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization; // pega o header Authorization da requisição
  
  if (!authHeader) { // verifica se o header Authorization foi enviado
    return response.status(401).json({
      message: "Token não informado." // retorna unauthorized, pois o token não foi informado
    });
  }

  const [, token] = authHeader.split(" "); // separa o prefixo "Bearer" do token

  if (!token) { // verifica se o token existe
    return response.status(401).json({
      message: "Token inválido." // retorna unauthorized, pois o token não foi enviado corretamente
    });
  }

  if (!process.env.JWT_SECRET) { // valida se a chave secreta usada para assinar o JWT foi definida no .env
    return response.status(500).json({
      message: "JWT_SECRET não configurado no servidor." // retorna internal server error, pois há erro de configuração no servidor
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload; // valida o token e recupera os dados salvos no payload

    request.userId = decoded.userId;
  
    return next(); // libera a requisição para seguir até o controller ou próximo middleware
  } catch {
    return response.status(401).json({
      message: "Token inválido ou expirado." // retorna unauthorized, caso o token não seja válido ou tenha expirado
    });
  }
}

export { authMiddleware };