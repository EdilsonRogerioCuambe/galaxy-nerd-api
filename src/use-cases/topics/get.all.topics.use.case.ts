import { TopicsRepository } from '@/repositories/topics.repository'
import { Topic } from '@prisma/client'

interface GetAllTopicsUseCaseProps {
  topics: Topic[]
}

export class GetAllTopicsUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute(): Promise<GetAllTopicsUseCaseProps> {
    const topics = await this.topicsRepository.findAll()

    return { topics }
  }
}
