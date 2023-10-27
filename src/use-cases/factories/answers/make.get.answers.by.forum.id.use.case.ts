import { PrismaAnswersRepository } from '@/repositories/prisma-repositories/prisma.answers.repositories'
import { GetAnswersByForumIdUseCase } from '@/use-cases/answers/ge.answers.by.forum.id.use.case'

export function makeGetAnswersByForumIdUseCase() {
  const prismaAnswersRepository = new PrismaAnswersRepository()

  const getAnswersByForumIdUseCase = new GetAnswersByForumIdUseCase(
    prismaAnswersRepository,
  )

  return getAnswersByForumIdUseCase
}
