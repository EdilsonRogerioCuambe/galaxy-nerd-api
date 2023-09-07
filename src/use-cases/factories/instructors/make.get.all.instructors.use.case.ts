import { PrismaInstructorsRepository } from '@/repositories/prisma-repositories/prisma.instructuros.repository'
import { GetAllInstructorsUseCase } from '@/use-cases/instructors/get.all.instrutors.use.case'

export function makeGetAllInstructorsUseCase() {
  const instructorsRepository = new PrismaInstructorsRepository()
  const getAllInstructorsUseCase = new GetAllInstructorsUseCase(
    instructorsRepository,
  )

  return getAllInstructorsUseCase
}
