import { Prisma, StudentQuizScore } from '@prisma/client'

export interface ScoreRepository {
  addScore: (
    score: Prisma.StudentQuizScoreCreateInput,
  ) => Promise<StudentQuizScore>
}
