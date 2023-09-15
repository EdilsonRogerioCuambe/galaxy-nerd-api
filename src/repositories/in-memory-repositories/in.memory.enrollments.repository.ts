import { Enrollment, Course, Student, Prisma } from '@prisma/client'
import { EnrollmentsRepository } from '../enrollments.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryEnrollmentsRepository implements EnrollmentsRepository {
  public enrollments: Enrollment[] = []
  public students: Student[] = []
  public courses: Course[] = []

  async create(data: Prisma.EnrollmentCreateInput): Promise<Enrollment> {
    if (!data.student?.connect?.id) {
      throw new Error('Student id is required')
    }

    if (!data.course?.connect?.id) {
      throw new Error('Course id is required')
    }

    const enrollment = {
      id: data.id !== undefined ? data.id : randomUUID(),
      studentId: data.student.connect.id,
      courseId: data.course.connect.id,
      createdAt: new Date(),
    }

    return enrollment
  }

  async findMany() {
    const enrollments = this.enrollments

    return enrollments
  }

  async findOne(id: string) {
    const enrollment = this.enrollments.find(
      (enrollment) => enrollment.id === id,
    )

    if (!enrollment) {
      return null
    }

    return enrollment
  }

  async findStudentById(id: string) {
    const student = this.students.find((student) => student.id === id)

    if (!student) {
      return null
    }

    return student
  }

  async findCourseById(id: string) {
    const course = this.courses.find((course) => course.id === id)

    if (!course) {
      return null
    }

    return course
  }

  async update(id: string, data: Prisma.EnrollmentUpdateInput) {
    const enrollment = this.enrollments.findIndex(
      (enrollment) => enrollment.id === id,
    )

    if (!data.student?.connect?.id) {
      throw new Error('Student id is required')
    }

    if (!data.course?.connect?.id) {
      throw new Error('Course id is required')
    }

    this.enrollments[enrollment] = {
      ...this.enrollments[enrollment],
      id: this.enrollments[enrollment].id,
      studentId: data.student.connect.id,
      courseId: data.course.connect.id,
      createdAt: this.enrollments[enrollment].createdAt,
    }

    return this.enrollments[enrollment]
  }

  async delete(id: string) {
    const enrollment = this.enrollments.findIndex(
      (enrollment) => enrollment.id === id,
    )

    this.enrollments.splice(enrollment, 1)

    return null
  }
}
