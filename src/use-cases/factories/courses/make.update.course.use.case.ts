import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { UpdateCourseUseCase } from '@/use-cases/courses/update.course.use.case'

export function makeUpdateCourseUseCase(): UpdateCourseUseCase {
  const coursesRepository = new PrismaCoursesRepository()

  const updateCourseUseCase = new UpdateCourseUseCase(coursesRepository)

  return updateCourseUseCase
}
