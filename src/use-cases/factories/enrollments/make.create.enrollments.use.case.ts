import { PrismaEnrollmentsRepository } from '@/repositories/prisma-repositories/prisma.enrollments.repository'
import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { PrismaStudentRepository } from '@/repositories/prisma-repositories/prisma.students.repository'
import { CreateEnrollmentUseCase } from '@/use-cases/enrollments/create.enrollments.use.case'
import { StripePaymentProcessor } from '@/repositories/stripe-payment-processor/stripe.payment.processor'

export function makeCreateEnrollmentUseCase() {
  const enrollmentsRepository = new PrismaEnrollmentsRepository()
  const coursesRepository = new PrismaCoursesRepository()
  const studentsRepository = new PrismaStudentRepository()
  const processPayment = new StripePaymentProcessor()

  const createEnrollmentUseCase = new CreateEnrollmentUseCase(
    enrollmentsRepository,
    studentsRepository,
    coursesRepository,
    processPayment,
  )

  return createEnrollmentUseCase
}
