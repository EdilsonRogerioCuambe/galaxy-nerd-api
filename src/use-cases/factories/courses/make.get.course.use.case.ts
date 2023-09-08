import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { GetCourseUseCase } from '@/use-cases/courses/get.course.use.case'

export function makeGetCourseUseCase(): GetCourseUseCase {
  const coursesRepository = new PrismaCoursesRepository()
  const getCourseUseCase = new GetCourseUseCase(coursesRepository)

  return getCourseUseCase
}
