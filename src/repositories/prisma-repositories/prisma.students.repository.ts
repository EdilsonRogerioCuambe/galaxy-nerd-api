import { Prisma } from '@prisma/client'
import { StudentsRepository } from '../students.repository'
import { prisma } from '@/lib/prisma'

export class PrismaStudentRepository implements StudentsRepository {
  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data,
    })

    return student
  }

  async findById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        scores: true,
        lessonProgress: true,
        interests: true,
      },
    })

    return student
  }

  async findByEmail(email: string) {
    const emailAlreadyExists = await prisma.student.findUnique({
      where: { email },
    })

    return emailAlreadyExists
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    const student = await prisma.student.update({
      where: { id },
      data,
    })

    return student
  }

  async findAll() {
    const students = await prisma.student.findMany({
      include: {
        scores: true,
        lessonProgress: true,
      },
    })

    return students
  }

  async delete(id: string) {
    await prisma.student.delete({
      where: { id },
    })
  }
}
