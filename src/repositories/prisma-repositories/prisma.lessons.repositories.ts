import { Prisma } from '@prisma/client'
import { LessonsRepository } from '../lessons.repository'
import { prisma } from '@/lib/prisma'

export class PrismaLessonsRepositories implements LessonsRepository {
  async create(data: Prisma.LessonCreateInput) {
    const lesson = await prisma.lesson.create({
      data,
    })

    return lesson
  }

  async findAll() {
    const lessons = await prisma.lesson.findMany({
      include: {
        topic: true,
      },
    })

    return lessons
  }

  async findById(id: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        topic: true,
      },
    })

    return lesson
  }

  async findBySlug(slug: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: {
        topic: true,
      },
    })

    return lesson
  }

  async findByTitle(title: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { title },
      include: {
        topic: true,
      },
    })

    return lesson
  }

  async update(id: string, data: Prisma.LessonUpdateInput) {
    const lesson = await prisma.lesson.update({
      where: { id },
      data,
    })

    return lesson
  }

  async delete(id: string) {
    const lesson = await prisma.lesson.delete({
      where: { id },
    })

    return lesson
  }
}
