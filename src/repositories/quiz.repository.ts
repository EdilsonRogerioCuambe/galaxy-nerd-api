import { Quiz, Prisma } from '@prisma/client'

export interface QuizRepository {
  create(quiz: Prisma.QuizCreateInput): Promise<Quiz>
  findMany(): Promise<Quiz[]>
  findById(id: string): Promise<Quiz | null>
  findQuizzesByLessonId(lessonId: string): Promise<Quiz[]>
  updateById(id: string, quiz: Prisma.QuizUpdateInput): Promise<Quiz | null>
  deleteById(id: string): Promise<Quiz | null>
}
