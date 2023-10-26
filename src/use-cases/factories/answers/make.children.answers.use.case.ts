import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { GetChildrenAnswersUseCase } from '@/use-cases/answers/get.children.answers.use.case'

export const makeGetChildrenAnswersUseCase = () => {
  const answersRepository = new PrismaAnswersRepository()
  const getChildrenAnswersUseCase = new GetChildrenAnswersUseCase(
    answersRepository,
  )

  return getChildrenAnswersUseCase
}
