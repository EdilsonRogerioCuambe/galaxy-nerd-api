import { PrismaQuizRepositories } from '@/repositories/prisma-repositories/prisma.quiz.repositories'
import { CreateQuizUseCase } from '@/use-cases/quizzes/create.quiz.use.case'

export const makeCreateQuizUseCase = (): CreateQuizUseCase => {
  const quizRepository = new PrismaQuizRepositories()
  const createQuizUseCase = new CreateQuizUseCase(quizRepository)

  return createQuizUseCase
}
