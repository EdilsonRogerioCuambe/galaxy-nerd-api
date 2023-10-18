import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'
import { CourseNotFoundError } from './err/course.not.found.error'

interface GetCourseBySlugUseCaseProps {
  slug: string
}

interface GetCourseBySlugUseCaseExecuteResponse {
  course: Course
}

export class GetCourseBySlugUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({
    slug,
  }: GetCourseBySlugUseCaseProps): Promise<GetCourseBySlugUseCaseExecuteResponse> {
    const course = await this.coursesRepository.findBySlug(slug)

    if (!course) {
      throw new CourseNotFoundError()
    }

    return { course }
  }
}
