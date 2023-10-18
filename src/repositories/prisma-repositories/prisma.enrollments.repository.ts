import { Prisma } from '@prisma/client'
import { EnrollmentsRepository } from '../enrollments.repository'
import { prisma } from '@/lib/prisma'

export class PrismaEnrollmentsRepository implements EnrollmentsRepository {
  async create(data: Prisma.EnrollmentCreateInput) {
    const enrollment = await prisma.enrollment.create({ data })

    return enrollment
  }

  async findAll() {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        course: true,
        student: true,
      },
    })

    return enrollments
  }

  async findById(id: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: true,
        course: true,
      },
    })

    return enrollment
  }

  async findStudentById(id: string) {
    const student = await prisma.student.findUnique({ where: { id } })

    return student
  }

  async findCourseById(id: string) {
    const course = await prisma.course.findUnique({ where: { id } })

    return course
  }

  async update(id: string, data: Prisma.EnrollmentUpdateInput) {
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data,
    })

    return enrollment
  }

  async delete(id: string) {
    const enrollment = await prisma.enrollment.delete({ where: { id } })

    return enrollment
  }
}
