import { Lesson, Prisma } from '@prisma/client'

export interface LessonsRepository {
  create(data: Prisma.LessonCreateInput): Promise<Lesson>
  findAll(): Promise<Lesson[]>
  findById(id: string): Promise<Lesson | null>
  findBySlug(slug: string): Promise<Lesson | null>
  findByTitle(title: string): Promise<Lesson | null>
  update(id: string, data: Prisma.LessonUpdateInput): Promise<Lesson>
  delete(id: string): Promise<Lesson>
}
