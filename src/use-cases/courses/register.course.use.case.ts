import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'
import { slugify } from '@/utils/slug'

interface RegisterCourseUseCaseProps {
  title: string
  description?: string
  price: string
  thumbnail?: string
  instructorId: string
  categoryId?: string
  studentId?: string
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
    studentId,
  }: RegisterCourseUseCaseProps): Promise<RegisterCourseUseCaseResponse> {
    const course = await this.coursesRepository.create({
      title,
      description,
      price,
      slug: slugify({ slug: title }),
      instructorId,
      categoryId,
      studentId,
    })

    return { course }
  }
}
