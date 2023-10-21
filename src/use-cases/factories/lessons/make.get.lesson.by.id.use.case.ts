import { GetLessonByIdUseCase } from '@/use-cases/lessons/get.lesson.by.id.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'

export function makeGetLessonByIdUseCase() {
  const prismaLessonsRepositories = new PrismaLessonsRepositories()

  const getLessonByIdUseCase = new GetLessonByIdUseCase(
    prismaLessonsRepositories,
  )

  return getLessonByIdUseCase
}
