import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'

interface UpdateAnswerUseCaseProps {
  id: string
  content?: string
  upvotes?: number
  downvotes?: number
}

interface UpdateAnswerUseCaseResponse {
  answer: Answers
}

export class UpdateAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
    content,
    upvotes,
    downvotes,
  }: UpdateAnswerUseCaseProps): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answersRepository.update(id, {
      content,
      upvotes,
      downvotes,
    })

    return { answer }
  }
}
