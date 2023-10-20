import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'
import { slugify } from '@/utils/slug'
import { CourseAlreadyExistsError } from './err/course.already.exists.error'

interface RegisterCourseUseCaseProps {
  title: string
  description?: string
  price: string
  thumbnail?: string
  image?: string
  level: string
  duration: string
  instructorId: string
  languages: string[]
  shortDescription?: string
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
    thumbnail,
    languages,
    duration,
    image,
    level,
    shortDescription,
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
      thumbnail,
      image,
      level,
      duration,
      shortDescription,
      languages: {
        connect: languages.map((language) => ({ id: language })),
      },
    })

    return { course }
  }
}
