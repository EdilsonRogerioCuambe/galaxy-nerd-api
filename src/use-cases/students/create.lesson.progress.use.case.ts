import { LessonsProgressRepository } from '@/repositories/lesson.progress.repository'
import { LessonProgress } from '@prisma/client'

interface CreateLessonProgressUseCaseProps {
  lessonId: string
  studentId: string
  watched: boolean
}

interface CreateLessonProgressUseCaseResponse {
  lessonProgress: LessonProgress
}

export class CreateLessonProgressUseCase {
  constructor(private lessonsProgressRepository: LessonsProgressRepository) {}

  async execute({
    lessonId,
    studentId,
    watched,
  }: CreateLessonProgressUseCaseProps): Promise<CreateLessonProgressUseCaseResponse> {
    const lessonProgress = await this.lessonsProgressRepository.create({
      lesson: {
        connect: {
          id: lessonId,
        },
      },
      student: {
        connect: {
          id: studentId,
        },
      },
      watched,
    })

    return {
      lessonProgress,
    }
  }
}
