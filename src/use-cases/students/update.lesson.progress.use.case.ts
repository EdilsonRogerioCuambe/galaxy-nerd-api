import { LessonsProgressRepository } from '@/repositories/lesson.progress.repository'
import { LessonProgress } from '@prisma/client'

interface UpdateLessonProgressProps {
  lessonProgressId: string
  studentId: string
  lessonId: string
  watched: boolean
}

interface UpdateLessonProgressResponse {
  lessonProgress: LessonProgress
}

export class UpdateLessonProgressUseCase {
  constructor(private lessonsProgressRepository: LessonsProgressRepository) {}

  async execute({
    lessonProgressId,
    studentId,
    lessonId,
    watched,
  }: UpdateLessonProgressProps): Promise<UpdateLessonProgressResponse> {
    const lessonProgress = await this.lessonsProgressRepository.update(
      lessonProgressId,
      studentId,
      lessonId,
      watched,
    )

    return {
      lessonProgress,
    }
  }
}
