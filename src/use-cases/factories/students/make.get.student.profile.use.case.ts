import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { GetStudentProfileUseCase } from '@/use-cases/students/get.student.profile.use.case'

export function makeGetStudentProfileUseCaseFactory() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const getStudentProfileUseCase = new GetStudentProfileUseCase(
    prismaStudentRepository,
  )

  return getStudentProfileUseCase
}
