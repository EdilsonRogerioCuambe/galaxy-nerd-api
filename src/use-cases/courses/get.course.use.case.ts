import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'
import { CourseNotFoundError } from './err/course.not.found.error'

interface GetCourseUseCaseProps {
  courseId: string
}

interface GetCourseUseCaseExecuteResponse {
  course: Course
}

export class GetCourseUseCase {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async execute({
    courseId,
  }: GetCourseUseCaseProps): Promise<GetCourseUseCaseExecuteResponse> {
    const course = await this.coursesRepository.findById(courseId)

    if (!course) {
      throw new CourseNotFoundError()
    }

    return { course }
  }
}
