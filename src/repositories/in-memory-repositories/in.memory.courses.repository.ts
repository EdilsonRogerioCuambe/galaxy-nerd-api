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
      duration: data.duration !== undefined ? data.duration : null,
      image: data.image !== undefined ? data.image : null,
      level: data.level !== undefined ? data.level : null,
      shortDescription:
        data.shortDescription !== undefined ? data.shortDescription : null,
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
      createdAt: this.courses[course].createdAt,
      updatedAt: new Date(),
      duration: data.duration as string | null,
      image: data.image as string | null,
      level: data.level as string | null,
      shortDescription: data.shortDescription as string | null,
      thumbnail: data.thumbnail as string | null,
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
    const course = this.courses.find((course) => course.title === title)

    if (!course) {
      return null
    }

    return course
  }
}
