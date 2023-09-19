import { Course, Student } from '@prisma/client'

export interface ProcessPaymentRepository {
  processPayment(course: Course, student: Student): Promise<boolean>
}
