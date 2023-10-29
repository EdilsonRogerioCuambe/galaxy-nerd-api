import { UpdateLessonProgressUseCase } from '@/use-cases/students/update.lesson.progress.use.case'
import { PrismaLessonProgressRepository } from '@/repositories/prisma-repositories/prisma.lesson.progress.repository'

export const makeUpdateLessonProgressUseCase =
  (): UpdateLessonProgressUseCase => {
    const prismaLessonProgressRepository = new PrismaLessonProgressRepository()

    const updateLessonProgressUseCase = new UpdateLessonProgressUseCase(
      prismaLessonProgressRepository,
    )

    return updateLessonProgressUseCase
  }
