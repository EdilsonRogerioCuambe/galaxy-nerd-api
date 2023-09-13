import { TopicsRepository } from '@/repositories/topics.repository'
import { TopicNotFoundError } from './err/topic.not.found.error'
import { Topic } from '@prisma/client'

interface GetTopicUseCaseProps {
  id: string
}

interface GetTopicUseCaseResponse {
  topic: Topic
}

export class GetTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    id,
  }: GetTopicUseCaseProps): Promise<GetTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(id)

    if (!topic) {
      throw new TopicNotFoundError()
    }

    return { topic }
  }
}
