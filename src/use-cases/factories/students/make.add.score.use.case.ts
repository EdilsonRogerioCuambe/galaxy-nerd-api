import { PrismaScoreRepository } from '@/repositories/prisma-repositories/prisma.score.repositories'
import { AddStudentScoreUseCase } from '@/use-cases/lessons/add.student.score.use.case'

export const makeAddStudentScoreUseCase = (): AddStudentScoreUseCase => {
  const scoreRepository = new PrismaScoreRepository()
  const addStudentScoreUseCase = new AddStudentScoreUseCase(scoreRepository)

  return addStudentScoreUseCase
}
