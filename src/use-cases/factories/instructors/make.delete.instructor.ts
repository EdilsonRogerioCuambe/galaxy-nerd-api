import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { DeleteInstructorUseCase } from '@/use-cases/instructors/delete.instructor.use.case'

export function makeDeleteInstructorUseCase(): DeleteInstructorUseCase {
  const instructorsRepository = new PrismaInstructorsRepository()
  const deleteInstructorUseCase = new DeleteInstructorUseCase(
    instructorsRepository,
  )
  return deleteInstructorUseCase
}
