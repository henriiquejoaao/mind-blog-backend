// extensão da tipagem padrão do Express para permitir adicionar o userId no request
declare namespace Express {
  export interface Request {
    userId?: number; // id do usuário autenticado, adicionado pelo authMiddleware
  }
}