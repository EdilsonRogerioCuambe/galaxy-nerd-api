import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'
import { slugify } from '@/utils/slug'
import { TopicsRepository } from '@/repositories/topics.repository'
import { TopicNotFoundError } from '../topics/err/topic.not.found.error'

interface RegisterLessonUseCaseProps {
  title: string
  description?: string
  topicId: string
  order: string
  videoUrl: string
  duration: string
}

interface RegisterLessonUseCaseResponse {
  lesson: Lesson
}

export class RegisterLessonUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private topicsRepository: TopicsRepository,
  ) {}

  async execute({
    title,
    description,
    topicId,
    order,
    videoUrl,
    duration,
  }: RegisterLessonUseCaseProps): Promise<RegisterLessonUseCaseResponse> {
    const slug = slugify({ slug: title })

    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      throw new TopicNotFoundError()
    }

    const lesson = await this.lessonsRepository.create({
      title,
      description,
      slug,
      topic: {
        connect: {
          id: topicId,
        },
      },
      order,
      videoUrl,
      duration,
    })

    return { lesson }
  }
}
