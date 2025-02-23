// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const Prisma = globalForPrisma.prisma || new PrismaClient();

export default Prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = Prisma;