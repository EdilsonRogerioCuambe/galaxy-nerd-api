import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'
import { slugify } from '@/utils/slug'

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
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    title,
    description,
    topicId,
    order,
    videoUrl,
    duration,
  }: RegisterLessonUseCaseProps): Promise<RegisterLessonUseCaseResponse> {
    const slug = slugify({ slug: title })

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
