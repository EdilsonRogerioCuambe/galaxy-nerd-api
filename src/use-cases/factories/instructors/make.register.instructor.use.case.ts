import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { RegisterInstructorUseCase } from '@/use-cases/instructors/register.use.case'

export function makeRegisterInstructor() {
  const prismaInstructorsRepository = new PrismaInstructorsRepository()
  const registerInstructorUseCase = new RegisterInstructorUseCase(
    prismaInstructorsRepository,
  )

  return registerInstructorUseCase
}
