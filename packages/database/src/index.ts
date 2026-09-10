import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __visionPrisma: PrismaClient | undefined;
}

export const prisma =
  global.__visionPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__visionPrisma = prisma;
}

export * from '@prisma/client';
