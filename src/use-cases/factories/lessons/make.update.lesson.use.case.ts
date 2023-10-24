import { UpdateLessonUseCase } from '@/use-cases/lessons/update.lesson.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'

export function makeUpdateLessonUseCase() {
  const lessonsRepository = new PrismaLessonsRepositories()
  const updateLessonUseCase = new UpdateLessonUseCase(lessonsRepository)
  return updateLessonUseCase
}
