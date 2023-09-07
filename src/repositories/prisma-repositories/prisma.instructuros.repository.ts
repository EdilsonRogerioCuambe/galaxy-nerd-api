import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { InstructorsRepository } from '../instructors.repository'

export class PrismaInstructorsRepository implements InstructorsRepository {
  async update(id: string, data: Prisma.InstructorUpdateInput) {
    const instructor = await prisma.instructor.update({
      where: { id },
      data,
    })

    return instructor
  }

  async delete(id: string) {
    await prisma.instructor.delete({
      where: { id },
    })
  }

  async findAll() {
    const instructors = await prisma.instructor.findMany()

    return instructors
  }

  async findById(id: string) {
    const instructor = await prisma.instructor.findUnique({
      where: { id },
    })

    return instructor
  }

  async findByEmail(email: string) {
    const emailAlreadyExists = await prisma.instructor.findUnique({
      where: { email },
    })

    return emailAlreadyExists
  }

  async create(data: Prisma.InstructorCreateInput) {
    const instructor = await prisma.instructor.create({
      data,
    })

    return instructor
  }
}
