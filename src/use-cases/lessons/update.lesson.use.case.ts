import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'
import { slugify } from '@/utils/slug'
import { LessonNotFoundError } from './error/lesson.not.found'

interface UpdateLessonUseCaseProps {
  title: string
  description?: string
  topicId?: string
  order?: string
  videoUrl?: string
  duration?: string
  lessonId: string
}

interface UpdateLessonUseCaseResponse {
  lesson: Lesson
}

export class UpdateLessonUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    title,
    description,
    topicId,
    order,
    videoUrl,
    duration,
    lessonId,
  }: UpdateLessonUseCaseProps): Promise<UpdateLessonUseCaseResponse> {
    const lesson = await this.lessonsRepository.findById(lessonId)

    if (!lesson) {
      throw new LessonNotFoundError()
    }

    const slug = slugify({ slug: title })

    const updatedLesson = await this.lessonsRepository.update(lessonId, {
      title: title || lesson.title,
      description: description || lesson.description,
      slug: slug || lesson.slug,
      topic: topicId
        ? {
            connect: {
              id: topicId,
            },
          }
        : undefined,
      order: order || lesson.order,
      videoUrl: videoUrl || lesson.videoUrl,
      duration: duration || lesson.duration,
    })

    return { lesson: updatedLesson }
  }
}
