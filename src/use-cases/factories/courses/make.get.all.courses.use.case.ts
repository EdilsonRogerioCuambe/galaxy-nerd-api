import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { GetAllCoursesUseCase } from '@/use-cases/courses/get.all.courses.use.case'

export function makeGetAllCoursesUseCase(): GetAllCoursesUseCase {
  const coursesRepository = new PrismaCoursesRepository()

  const getAllCoursesUseCase = new GetAllCoursesUseCase(coursesRepository)

  return getAllCoursesUseCase
}
