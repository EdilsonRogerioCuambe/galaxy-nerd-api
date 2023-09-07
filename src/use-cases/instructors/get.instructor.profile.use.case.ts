import { InstructorNotFoundError } from './err/instructor.not.found.error'
import { InstructorsRepository } from '@/repositories/instructors.repository'
import { Instructor } from '@prisma/client'

interface GetInstructorProfileUseCaseProps {
  instructorId: string
}

interface GetInstructorProfileUseCaseResponse {
  instructor: Instructor
}

export class GetInstructorProfileUseCase {
  constructor(private readonly instructorsRepository: InstructorsRepository) {}

  async execute({
    instructorId,
  }: GetInstructorProfileUseCaseProps): Promise<GetInstructorProfileUseCaseResponse> {
    const instructor = await this.instructorsRepository.findById(instructorId)

    if (!instructor) {
      throw new InstructorNotFoundError()
    }

    return { instructor }
  }
}
