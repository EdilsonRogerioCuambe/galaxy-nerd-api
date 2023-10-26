import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'

interface DeleteAnswerUseCaseProps {
  id: string
}

interface DeleteAnswerUseCaseResponse {
  answer: Answers
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
  }: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.delete(id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    return { answer }
  }
}
