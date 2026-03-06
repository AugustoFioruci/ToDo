import { PrismaClient } from '../../generated/prisma/client.ts'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida no .env!');
}


console.log('Conectando com DB:', connectionString.replace(/:.*@/, ':****@')); // esconde senha

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'], 
});