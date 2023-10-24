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
  instructorId: string
  image?: string
  shortDescription?: string
  duration?: string
  level?: string
  languages?: string[]
  favorites?: string[]
  ratings?: string[]
  topics?: string[]
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
    instructorId,
    image,
    shortDescription,
    duration,
    level,
    languages,
    favorites,
    ratings,
    topics,
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
      thumbnail,
      image,
      shortDescription,
      duration,
      level,
      languages: {
        connect: languages?.map((language) => ({ id: language })),
      },
      favorites: {
        connect: favorites?.map((favorite) => ({ id: favorite })),
      },
      ratings: {
        connect: ratings?.map((rating) => ({ id: rating })),
      },
      topics: {
        connect: topics?.map((topic) => ({ id: topic })),
      },
    })

    return { course }
  }
}
