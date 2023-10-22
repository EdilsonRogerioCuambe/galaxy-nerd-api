import { RegisterLessonUseCase } from '@/use-cases/lessons/register.lesson.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'
import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'

export function makeRegisterLessonUseCase() {
  const lessonsRepository = new PrismaLessonsRepositories()
  const topicsRepository = new PrismaTopicsRepository()
  const registerLessonUseCase = new RegisterLessonUseCase(
    lessonsRepository,
    topicsRepository,
  )
  return registerLessonUseCase
}
