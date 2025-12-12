// apps/server/src/lib/prisma.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// Importamos desde TU ruta personalizada
import { PrismaClient } from '../generated/prisma-client/client'; 
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuramos el Pool de conexiones de PostgreSQL (Driver nativo)
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ 
  connectionString 
});

// 2. Creamos el adaptador de Prisma para PG
const adapter = new PrismaPg(pool);

// 3. Instanciamos el cliente pasándole el adaptador
// (Esto satisface el requerimiento de "PrismaClientOptions" no vacío)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
  adapter 
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;