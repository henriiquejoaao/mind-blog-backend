import { PrismaClient } from "@prisma/client"; // importa o Prisma Client gerado pelo Prisma

const prisma = new PrismaClient(); // cria uma instância do Prisma para acessar o banco

export { prisma }; // exporta a instância para ser usada nos controllers