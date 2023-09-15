import { PrismaEnrollmentsRepository } from '@/repositories/prisma-repositories/prisma.enrollments.repository'
import { CreateEnrollmentUseCase } from '@/use-cases/enrollments/create.enrollments.use.case'

export function makeCreateEnrollmentUseCase() {
  const enrollmentsRepository = new PrismaEnrollmentsRepository()

  const createEnrollmentUseCase = new CreateEnrollmentUseCase(
    enrollmentsRepository,
  )

  return createEnrollmentUseCase
}
