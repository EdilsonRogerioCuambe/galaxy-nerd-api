import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { AuthenticateInstructorsUseCase } from '@/use-cases/instructors/authenticate.use.case'

export function makeAuthenticateInstructorUseCase() {
  const prismaInstructorsRepository = new PrismaInstructorsRepository()
  const authenticateInstructorsUseCase = new AuthenticateInstructorsUseCase(
    prismaInstructorsRepository,
  )

  return authenticateInstructorsUseCase
}
