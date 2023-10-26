import { Answers } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'

interface GetChildrenAnswersUseCaseProps {
  id: string
}

interface GetChildrenAnswersUseCaseResponse {
  answers: Answers[]
}

export class GetChildrenAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
  }: GetChildrenAnswersUseCaseProps): Promise<GetChildrenAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findChildren(id)

    if (!answers) {
      throw new Error('Answers not found')
    }

    return { answers }
  }
}
