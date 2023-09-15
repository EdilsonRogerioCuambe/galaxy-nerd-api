import { Course, Enrollment, Prisma, Student } from '@prisma/client'

export interface EnrollmentsRepository {
  create(data: Prisma.EnrollmentCreateInput): Promise<Enrollment>
  findMany(): Promise<Enrollment[]>
  findOne(id: string): Promise<Enrollment | null>
  findStudentById(id: string): Promise<Student | null>
  findCourseById(id: string): Promise<Course | null>
  update(
    id: string,
    data: Prisma.EnrollmentUpdateInput,
  ): Promise<Enrollment | null>
  delete(id: string): Promise<Enrollment | null>
}
