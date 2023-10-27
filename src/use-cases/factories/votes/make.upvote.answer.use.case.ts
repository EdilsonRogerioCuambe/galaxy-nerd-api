import { PrismaVoteAnswersRepository } from '@/repositories/prisma-repositories/prisma.vote.answers.repository'
import { UpvoteAnswerUseCase } from '@/use-cases/vote/upvote.asnwer.use.case'

export function makeUpvoteAnswerUseCase(): UpvoteAnswerUseCase {
  const prismaVoteAnswersRepository = new PrismaVoteAnswersRepository()

  const upvoteAnswerUseCase = new UpvoteAnswerUseCase(
    prismaVoteAnswersRepository,
  )

  return upvoteAnswerUseCase
}
