import { PrismaCoursesRepository } from '@/repositories/prisma-repositories/prisma.courses.repository'
import { RegisterCourseUseCase } from '@/use-cases/courses/register.course.use.case'

export function makeRegisterCourseUseCase() {
  const prismaCoursesRepository = new PrismaCoursesRepository()

  const registerCourseUseCase = new RegisterCourseUseCase(
    prismaCoursesRepository,
  )

  return registerCourseUseCase
}
