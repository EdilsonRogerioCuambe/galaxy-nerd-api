import { CoursesRepository } from '@/repositories/courses.repository'
import { CourseNotFoundError } from './err/course.not.found.error'

interface DeleteCourseUseCaseProps {
  courseId: string
}

export class DeleteCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({ courseId }: DeleteCourseUseCaseProps): Promise<void> {
    const course = await this.coursesRepository.findById(courseId)

    if (!course) {
      throw new CourseNotFoundError()
    }

    await this.coursesRepository.delete(courseId)
  }
}
