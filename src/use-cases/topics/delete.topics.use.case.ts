import { TopicsRepository } from '@/repositories/topics.repository'
import { Topic } from '@prisma/client'
import { TopicNotFoundError } from './err/topic.not.found.error'

interface DeleteTopicUseCaseProps {
  id: string
}

interface DeleteTopicUseCaseResponse {
  topic: Topic
}

export class DeleteTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    id,
  }: DeleteTopicUseCaseProps): Promise<DeleteTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(id)

    if (!topic) {
      throw new TopicNotFoundError()
    }

    return {
      topic,
    }
  }
}
