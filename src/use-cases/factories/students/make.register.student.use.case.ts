import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { RegisterStudentUseCase } from '@/use-cases/students/register.student.use.case'

export function makeRegisterStudentUseCase(): RegisterStudentUseCase {
  const prismaStudentsRepository = new PrismaStudentRepository()
  const registerStudentUseCase = new RegisterStudentUseCase(
    prismaStudentsRepository,
  )

  return registerStudentUseCase
}
