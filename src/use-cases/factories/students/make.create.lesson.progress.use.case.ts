import { CreateLessonProgressUseCase } from '@/use-cases/students/create.lesson.progress.use.case'
import { PrismaLessonProgressRepository } from '@/repositories/prisma-repositories/prisma.lesson.progress.repository'

export const makeCreateLessonProgressUseCase =
  (): CreateLessonProgressUseCase => {
    const prismaLessonProgressRepository = new PrismaLessonProgressRepository()

    const createLessonProgressUseCase = new CreateLessonProgressUseCase(
      prismaLessonProgressRepository,
    )

    return createLessonProgressUseCase
  }
