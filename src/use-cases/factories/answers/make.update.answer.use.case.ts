import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { UpdateAnswerUseCase } from '@/use-cases/answers/update.answer.use.case'

export function makeUpdateAnswerUseCase() {
  const prismaAnswersRepository = new PrismaAnswersRepository()

  const updateAnswerUseCase = new UpdateAnswerUseCase(prismaAnswersRepository)

  return updateAnswerUseCase
}
