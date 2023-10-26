import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { GetAnswerByIdUseCase } from '@/use-cases/answers/get.answer.by.id.use.case'

export const makeGetAnswerByIdUseCase = () => {
  const answersRepository = new PrismaAnswersRepository()
  const getAnswerByIdUseCase = new GetAnswerByIdUseCase(answersRepository)

  return getAnswerByIdUseCase
}
