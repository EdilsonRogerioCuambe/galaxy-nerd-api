import { prisma } from '@/lib/prisma'
import { Prisma, StudentQuizScore } from '@prisma/client'
import { ScoreRepository } from '../scores.resporitory'

export class PrismaScoreRepository implements ScoreRepository {
  async addScore(
    score: Prisma.StudentQuizScoreCreateInput,
  ): Promise<StudentQuizScore> {
    const newScore = await prisma.studentQuizScore.create({ data: score })

    return newScore
  }
}
