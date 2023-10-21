import { GetLessonBySlugUseCase } from '@/use-cases/lessons/get.lesson.by.slug.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'

export function makeGetLessonBySlugUseCase() {
  const prismaLessonsRepositories = new PrismaLessonsRepositories()

  const getLessonBySlugUseCase = new GetLessonBySlugUseCase(
    prismaLessonsRepositories,
  )

  return getLessonBySlugUseCase
}
