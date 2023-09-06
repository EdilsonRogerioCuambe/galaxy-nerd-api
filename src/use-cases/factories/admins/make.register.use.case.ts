import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { RegisterAdminUseCase } from '@/use-cases/admins/register.use.case'

export function makeRegisterAdminUseCase(): RegisterAdminUseCase {
  const prismaAdminsRepository = new PrismaAdminsRepository()
  const registerAdminUseCase = new RegisterAdminUseCase(prismaAdminsRepository)
  return registerAdminUseCase
}
