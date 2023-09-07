import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { GetInstructorProfileUseCase } from '@/use-cases/instructors/get.instructor.profile.use.case'

export function makeGetInstructorProfileUseCase(): GetInstructorProfileUseCase {
  const instructorsRepository = new PrismaInstructorsRepository()
  const getInstructorProfileUseCase = new GetInstructorProfileUseCase(
    instructorsRepository,
  )

  return getInstructorProfileUseCase
}
