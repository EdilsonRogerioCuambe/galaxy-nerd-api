import { AnswersRepository } from '@/repositories/answers.repository'
import { Answers } from '@prisma/client'

interface GetAnswersByForumIdUseCaseProps {
  forumId: string
}

interface GetAnswersByForumIdUseCaseResponse {
  answers: Answers[]
}

export class GetAnswersByForumIdUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    forumId,
  }: GetAnswersByForumIdUseCaseProps): Promise<GetAnswersByForumIdUseCaseResponse> {
    const answers = await this.answersRepository.findByForumId(forumId)

    return { answers }
  }
}
