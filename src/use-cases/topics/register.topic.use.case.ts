import { TopicsRepository } from '@/repositories/topics.repository'
import { Topic } from '@prisma/client'
import { TopicAlreadyExistsError } from './err/topic.already.exists.error'
import { slugify } from '@/utils/slug'

interface RegisterTopicUseCaseProps {
  title: string
  icon?: string
  description?: string
  order: string
  courseId: string
}

interface RegisterTopicUseCaseResponse {
  topic: Topic
}

export class RegisterTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    title,
    icon,
    description,
    order,
    courseId,
  }: RegisterTopicUseCaseProps): Promise<RegisterTopicUseCaseResponse> {
    const topicAlreadyExists = await this.topicsRepository.findByTitle(title)

    if (topicAlreadyExists) {
      throw new TopicAlreadyExistsError()
    }

    const slugifiedTitle = slugify({ slug: title })

    const topic = await this.topicsRepository.create({
      title,
      icon,
      description,
      order,
      course: {
        connect: {
          id: courseId,
        },
      },
      slug: slugifiedTitle,
    })

    return { topic }
  }
}
