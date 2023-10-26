import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'
import { AnswerNotFoundError } from './error/answer.not.found.error'

interface GetAnswerByIdUseCaseProps {
  id: string
}

interface GetAnswerByIdUseCaseResponse {
  answer: Answers
}

export class GetAnswerByIdUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
  }: GetAnswerByIdUseCaseProps): Promise<GetAnswerByIdUseCaseResponse> {
    const answer = await this.answersRepository.findById(id)

    if (!answer) {
      throw new AnswerNotFoundError()
    }

    return { answer }
  }
}
