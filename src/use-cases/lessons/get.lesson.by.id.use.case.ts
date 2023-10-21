import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'
import { LessonNotFoundError } from './error/lesson.not.found'

interface GetLessonByIdUseCaseProps {
  id: string
}

interface GetLessonByIdUseCaseResponse {
  lesson: Lesson
}

export class GetLessonByIdUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    id,
  }: GetLessonByIdUseCaseProps): Promise<GetLessonByIdUseCaseResponse> {
    const lesson = await this.lessonsRepository.findById(id)

    if (!lesson) {
      throw new LessonNotFoundError()
    }

    return { lesson }
  }
}
