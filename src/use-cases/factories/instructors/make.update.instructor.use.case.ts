import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { UpdateInstructorUseCase } from '@/use-cases/instructors/update.instructor.use.case'

export function makeUpdateInstructorUseCase(): UpdateInstructorUseCase {
  const prismaInstructorsRepository = new PrismaInstructorsRepository()
  const updateInstructorUseCase = new UpdateInstructorUseCase(
    prismaInstructorsRepository,
  )

  return updateInstructorUseCase
}
