import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'
import { slugify } from '@/utils/slug'
import { CourseAlreadyExistsError } from './err/course.already.exists.error'

interface RegisterCourseUseCaseProps {
  title: string
  description?: string
  price: string
  thumbnail?: string
  instructorId: string
  categoryId?: string
}

interface RegisterCourseUseCaseResponse {
  course: Course
}

export class RegisterCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({
    title,
    description,
    price,
    instructorId,
    categoryId,
    thumbnail,
  }: RegisterCourseUseCaseProps): Promise<RegisterCourseUseCaseResponse> {
    const courseAlreadyExists = await this.coursesRepository.findByTitle(title)

    if (courseAlreadyExists) {
      throw new CourseAlreadyExistsError()
    }

    const slug = slugify({ slug: title })

    const course = await this.coursesRepository.create({
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
