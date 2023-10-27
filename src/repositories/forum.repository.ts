import { Forum, Prisma } from '@prisma/client'

export interface ForunsRepository {
  create(data: Prisma.ForumUncheckedCreateInput): Promise<Forum>
  findById(id: string): Promise<Forum | null>
  findAll(): Promise<Forum[]>
  delete(id: string): Promise<void>
  update(id: string, data: Prisma.ForumUncheckedUpdateInput): Promise<Forum>
  findBySlug(slug: string): Promise<Forum | null>
  findByTitle(title: string): Promise<Forum | null>
  findAllForumsByLessonId(lessonId: string): Promise<Forum[]>
}
