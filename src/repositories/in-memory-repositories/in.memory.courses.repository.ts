import { CoursesRepository } from '../courses.repository'
import { Course, Prisma } from '@prisma/client'

export class InMemoryCoursesRepository implements CoursesRepository {
  private courses: Course[] = []

  async create(data: Prisma.CourseUncheckedCreateInput): Promise<Course> {
    const course: Course = {
      id: 'any_id',
      title: data.title,
      description: data.description !== undefined ? data.description : null,
      price: data.price,
      slug: data.slug,
      thumbnail: data.thumbnail !== undefined ? data.thumbnail : null,
      instructorId: data.instructorId !== undefined ? data.instructorId : null,
      categoryId: data.categoryId !== undefined ? data.categoryId : null,
      studentId: data.studentId !== undefined ? data.studentId : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.courses.push(course)

    return course
  }

  async findById(id: string) {
    const course = this.courses.find((course) => course.id === id)

    if (!course) {
      return null
    }

    return course
  }

  async findAll() {
    const courses = this.courses

    return courses
  }

  async delete(id: string) {
    const course = this.courses.findIndex((course) => course.id === id)

    this.courses.splice(course, 1)
  }

  async update(
    id: string,
    data: Prisma.CourseUncheckedUpdateInput,
  ): Promise<Course> {
    const course = this.courses.findIndex((course) => course.id === id)

    this.courses[course] = {
      ...this.courses[course],
      id: this.courses[course].id,
      title: data.title as string,
      description: data.description as string | null,
      price: data.price as string,
      slug: data.slug as string,
      instructorId: data.instructorId as string | null,
      categoryId: data.categoryId as string | null,
      studentId: data.studentId as string | null,
      createdAt: this.courses[course].createdAt,
      updatedAt: new Date(),
    }

    return this.courses[course]
  }

  async findBySlug(slug: string) {
    const course = this.courses.find((course) => course.slug === slug)

    if (!course) {
      return null
    }

    return course
  }

  async findByTitle(title: string) {
    const courses = this.courses.filter((course) => course.title === title)

    return courses
  }
}
