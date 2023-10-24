import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'
import { LessonNotFoundError } from './error/lesson.not.found'

interface GetLessonBySlugUseCaseProps {
  slug: string
}

interface GetLessonBySlugUseCaseResponse {
  lesson: Lesson
}

export class GetLessonBySlugUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    slug,
  }: GetLessonBySlugUseCaseProps): Promise<GetLessonBySlugUseCaseResponse> {
    const lesson = await this.lessonsRepository.findBySlug(slug)

    if (!lesson) {
      throw new LessonNotFoundError()
    }

    return { lesson }
  }
}
