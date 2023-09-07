import { CoursesRepository } from '@/repositories/courses.repository'
import { CourseNotFoundError } from './err/course.not.found.error'
import { Course } from '@prisma/client'
import { slugify } from '@/utils/slug'

interface UpdateCourseUseCaseProps {
  courseId: string
  title?: string
  description?: string
  price?: string
  thumbnail?: string
  categoryId?: string
  instructorId: string
}

interface UpdateCourseUseCaseResponse {
  course: Course
}

export class UpdateCourseUseCase {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async execute({
    courseId,
    title,
    description,
    price,
    thumbnail,
    categoryId,
    instructorId,
  }: UpdateCourseUseCaseProps): Promise<UpdateCourseUseCaseResponse> {
    const courseAlreadyExists = await this.coursesRepository.findById(courseId)

    if (!courseAlreadyExists) {
      throw new CourseNotFoundError()
    }

    const slug = title ? slugify({ slug: title }) : ''

    const course = await this.coursesRepository.update(courseId, {
      title,
      description,
      price,
      slug,
      instructorId,
      categoryId,
      thumbnail,
    })

    return { course }
  }
}
