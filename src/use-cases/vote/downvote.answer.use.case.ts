import { VotesRepository } from '@/repositories/vote.answers.repository'
import { Vote } from '@prisma/client'

interface DownvoteAnswerUseCaseProps {
  id: string
  instructorId?: string
  studentId?: string
}

interface DownvoteAnswerUseCaseOutput {
  vote: Vote
}

export class DownvoteAnswerUseCase {
  constructor(private votesRepository: VotesRepository) {}

  async execute(
    data: DownvoteAnswerUseCaseProps,
  ): Promise<DownvoteAnswerUseCaseOutput> {
    const { id } = data

    const vote = await this.votesRepository.downvoteAnswer(
      id,
      data.studentId,
      data.instructorId,
    )

    return {
      vote,
    }
  }
}
