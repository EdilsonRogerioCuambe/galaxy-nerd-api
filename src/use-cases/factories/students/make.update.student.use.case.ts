import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { UpdateStudentUseCase } from '@/use-cases/students/update.student.use.case'

export function makeUpdateStudentUseCaseFactory(): UpdateStudentUseCase {
  const prismaStudentsRepository = new PrismaStudentRepository()
  const updateStudentUseCase = new UpdateStudentUseCase(
    prismaStudentsRepository,
  )

  return updateStudentUseCase
}
