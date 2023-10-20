import { Prisma } from '@prisma/client'
import { CoursesRepository } from '../courses.repository'
import { prisma } from '@/lib/prisma'

export class PrismaCoursesRepository implements CoursesRepository {
  async update(id: string, data: Prisma.CourseUncheckedUpdateInput) {
    const course = await prisma.course.update({
      where: { id },
      data,
    })

    return course
  }

  async delete(id: string) {
    await prisma.course.delete({
      where: { id },
    })
  }

  async findAll() {
    const courses = await prisma.course.findMany({
      include: {
        instructor: true,
        languages: true,
        topics: true,
        enrollments: true,
      },
    })

    return courses
  }

  async findById(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        languages: true,
        favorites: true,
        topics: true,
        enrollments: true,
      },
    })

    return course
  }

  async findBySlug(slug: string) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        instructor: true,
        languages: true,
        favorites: true,
        topics: true,
        enrollments: true,
      },
    })

    return course
  }

  async create(data: Prisma.CourseCreateInput) {
    const course = await prisma.course.create({
      data,
    })

    return course
  }

  async findByTitle(title: string) {
    const course = await prisma.course.findUnique({
      where: { title },
      include: {
        instructor: true,
        languages: true,
        favorites: true,
        topics: true,
        enrollments: true,
      },
    })

    return course
  }
}
