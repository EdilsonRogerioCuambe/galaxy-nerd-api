import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { AuthenticateStudentUseCase } from '@/use-cases/students/authenticate.student.use.case'

export function makeAuthenticateStudentUseCase() {
  const prismaStudentsRepository = new PrismaStudentRepository()

  const authenticateStudentUseCase = new AuthenticateStudentUseCase(
    prismaStudentsRepository,
  )

  return authenticateStudentUseCase
}
