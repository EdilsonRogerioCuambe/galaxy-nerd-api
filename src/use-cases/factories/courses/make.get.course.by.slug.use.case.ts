import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { GetCourseBySlugUseCase } from '@/use-cases/courses/get.course.by.slug.use.case'

export const makeGetCourseBySlugUseCase = (): GetCourseBySlugUseCase => {
  const coursesRepository = new PrismaCoursesRepository()
  const getCourseBySlugUseCase = new GetCourseBySlugUseCase(coursesRepository)

  return getCourseBySlugUseCase
}
