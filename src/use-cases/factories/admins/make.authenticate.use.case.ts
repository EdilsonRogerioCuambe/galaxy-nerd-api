import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { AuthenticateAdminsUseCase } from '@/use-cases/admins/authenticate.use.case'

export function makeAuthenticateAdminUseCase(): AuthenticateAdminsUseCase {
  const prismaAdminsRepository = new PrismaAdminsRepository()
  const authenticateAdminUseCase = new AuthenticateAdminsUseCase(
    prismaAdminsRepository,
  )
  return authenticateAdminUseCase
}
