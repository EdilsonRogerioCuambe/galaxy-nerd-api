import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { GetAllStudentsUseCase } from '@/use-cases/students/get.all.students.use.case'

export function makeGetAllStudentsUseCaseFactory() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const getAllStudentsUseCase = new GetAllStudentsUseCase(
    prismaStudentRepository,
  )

  return getAllStudentsUseCase
}
