import { PrismaClient } from '../prisma/generated/client'

export function createPrismaClient() {
  return new PrismaClient()
}
