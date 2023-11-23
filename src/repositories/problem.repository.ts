import { Problem, Prisma } from '@prisma/client'

export interface ProblemRepository {
  create(data: Prisma.ProblemCreateInput): Promise<Problem>
  findAll(): Promise<Problem[]>
  findById(id: string): Promise<Problem | null>
  findProblemByLessonId(lessonId: string): Promise<Problem>
  update(id: string, data: Prisma.ProblemUpdateInput): Promise<Problem>
  delete(id: string): Promise<Problem>
}
