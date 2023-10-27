import { PrismaVoteAnswersRepository } from '@/repositories/prisma-repositories/prisma.vote.answers.repository'
import { DownvoteAnswerUseCase } from '@/use-cases/vote/downvote.answer.use.case'

export const makeDownvoteAnswerUseCase = (): DownvoteAnswerUseCase => {
  const prismaVoteAnswersRepository = new PrismaVoteAnswersRepository()
  return new DownvoteAnswerUseCase(prismaVoteAnswersRepository)
}
