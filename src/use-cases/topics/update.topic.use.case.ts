import { TopicsRepository } from '@/repositories/topics.repository'
import { TopicNotFoundError } from './err/topic.not.found.error'
import { slugify } from '@/utils/slug'
import { Topic } from '@prisma/client'

interface UpdateTopicUseCaseProps {
  id: string
  title: string
  icon: string
  description: string
  order: string
  courseId: string
}

interface UpdateTopicUseCaseResponse {
  topic: Topic
}

export class UpdateTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    id,
    title,
    icon,
    description,
    order,
    courseId,
  }: UpdateTopicUseCaseProps): Promise<UpdateTopicUseCaseResponse> {
    const topicNotFound = await this.topicsRepository.findById(id)

    if (!topicNotFound) {
      throw new TopicNotFoundError()
    }

    let slug

    if (title) {
      slug = slugify({ slug: title })
    }

    const topic = await this.topicsRepository.update(id, {
      id,
      title,
      icon,
      description,
      order,
      course: {
        connect: {
          id: courseId,
        },
      },
      slug,
    })

    return { topic }
  }
}
