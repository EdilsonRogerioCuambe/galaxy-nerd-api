import { PrismaEnrollmentsRepository } from '@/repositories/prisma-repositories/prisma.enrollments.repository'
import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { CreateEnrollmentUseCase } from '@/use-cases/enrollments/create.enrollments.use.case'

export function makeCreateEnrollmentUseCase() {
  const enrollmentsRepository = new PrismaEnrollmentsRepository()
  const coursesRepository = new PrismaCoursesRepository()
  const studentsRepository = new PrismaStudentRepository()

  const createEnrollmentUseCase = new CreateEnrollmentUseCase(
    enrollmentsRepository,
    studentsRepository,
    coursesRepository,
  )

  return createEnrollmentUseCase
}
