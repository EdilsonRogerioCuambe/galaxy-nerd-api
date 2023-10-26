import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'
import { AnswerNotFoundError } from './error/answer.not.found.error'

interface GetParentAnswerUseCaseProps {
  id: string
}

interface GetParentAnswerUseCaseResponse {
  answer: Answers
}

export class GetParentAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
  }: GetParentAnswerUseCaseProps): Promise<GetParentAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findParent(id)

    if (!answer) {
      throw new AnswerNotFoundError()
    }

    return { answer }
  }
}
