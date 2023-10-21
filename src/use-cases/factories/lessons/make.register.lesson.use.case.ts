import { RegisterLessonUseCase } from '@/use-cases/lessons/register.lesson.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'

export function makeRegisterLessonUseCase() {
  const lessonsRepository = new PrismaLessonsRepositories()
  const registerLessonUseCase = new RegisterLessonUseCase(lessonsRepository)
  return registerLessonUseCase
}
