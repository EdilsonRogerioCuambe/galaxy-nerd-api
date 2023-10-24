import { LessonsRepository } from '@/repositories/lessons.repository'
import { Lesson } from '@prisma/client'

interface GetAllLessonsUseCaseResponse {
  lessons: Lesson[]
}

export class GetAllLessonsUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute(): Promise<GetAllLessonsUseCaseResponse> {
    const lessons = await this.lessonsRepository.findAll()

    return { lessons }
  }
}
