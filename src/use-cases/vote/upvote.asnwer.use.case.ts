import { VotesRepository } from '@/repositories/vote.answers.repository'
import { Vote } from '@prisma/client'

interface UpvoteAnswerUseCaseProps {
  id: string
  studentId?: string
  instructorId?: string
}

interface UpvoteAnswerUseCaseOutput {
  vote: Vote
}

export class UpvoteAnswerUseCase {
  constructor(private votesRepository: VotesRepository) {}

  async execute(
    data: UpvoteAnswerUseCaseProps,
  ): Promise<UpvoteAnswerUseCaseOutput> {
    const { id } = data

    const vote = await this.votesRepository.upvoteAnswer(
      id,
      data.studentId,
      data.instructorId,
    )

    return {
      vote,
    }
  }
}
