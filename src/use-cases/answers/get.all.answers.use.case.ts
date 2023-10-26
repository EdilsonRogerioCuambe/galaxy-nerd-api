import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'

interface GetAllAnswersUseCaseResponse {
  answers: Answers[]
}

export class GetAllAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(): Promise<GetAllAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findAll()

    return { answers }
  }
}
