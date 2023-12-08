import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { GetInstructorByEmailUseCase } from '@/use-cases/instructors/get.instructor.by.email.use.case'

export function makeGetInstructorByEmailUseCase() {
  const prismaInstructorsRepository = new PrismaInstructorsRepository()
  const getInstructorByEmailUseCase = new GetInstructorByEmailUseCase(
    prismaInstructorsRepository,
  )

  return getInstructorByEmailUseCase
}
