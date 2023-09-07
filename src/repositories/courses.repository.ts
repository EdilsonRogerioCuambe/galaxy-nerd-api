import { Course, Prisma } from '@prisma/client'

export interface CoursesRepository {
  create(data: Prisma.CourseUncheckedCreateInput): Promise<Course>
  findById(id: string): Promise<Course | null>
  findAll(): Promise<Course[]>
  delete(id: string): Promise<void>
  update(id: string, data: Prisma.CourseUncheckedUpdateInput): Promise<Course>
  findBySlug(slug: string): Promise<Course | null>
  findByTitle(title: string): Promise<Course[] | null>
}
