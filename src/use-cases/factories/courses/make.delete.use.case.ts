import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { DeleteCourseUseCase } from '@/use-cases/courses/delete.course.use.case'

export function makeDeleteCourseUseCase(): DeleteCourseUseCase {
  const coursesRepository = new PrismaCoursesRepository()
  const deleteCourseUseCase = new DeleteCourseUseCase(coursesRepository)

  return deleteCourseUseCase
}
