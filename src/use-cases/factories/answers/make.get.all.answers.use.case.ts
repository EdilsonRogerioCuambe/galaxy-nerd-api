import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { GetAllAnswersUseCase } from '@/use-cases/answers/get.all.answers.use.case'

export const makeGetAllAnswersUseCase = () => {
  const prismaAnswersRepository = new PrismaAnswersRepository()

  const getAllAnswersUseCase = new GetAllAnswersUseCase(prismaAnswersRepository)

  return getAllAnswersUseCase
}
