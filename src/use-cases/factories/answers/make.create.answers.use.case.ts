import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { CreateAnswerUseCase } from '@/use-cases/answers/create.answer.use.case'

export const makeCreateAnswerUseCase = () => {
  const answersRepository = new PrismaAnswersRepository()
  const createAnswerUseCase = new CreateAnswerUseCase(answersRepository)

  return createAnswerUseCase
}
