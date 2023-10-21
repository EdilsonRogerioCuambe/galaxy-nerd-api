import { GetAllLessonsUseCase } from '@/use-cases/lessons/get.all.courses.use.case'
import { PrismaLessonsRepositories } from '@/repositories/prisma-repositories/prisma.lessons.repositories'

export function makeGetAllLessonsUseCase() {
  const lessonsRepository = new PrismaLessonsRepositories()
  const getAllLessonsUseCase = new GetAllLessonsUseCase(lessonsRepository)
  return getAllLessonsUseCase
}
