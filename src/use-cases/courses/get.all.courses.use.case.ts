import { CoursesRepository } from '@/repositories/courses.repository'
import { Course } from '@prisma/client'

interface GetAllCoursesUseCaseResponse {
  courses: Course[]
}

export class GetAllCoursesUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<GetAllCoursesUseCaseResponse> {
    const courses = await this.coursesRepository.findAll()

    return { courses }
  }
}
