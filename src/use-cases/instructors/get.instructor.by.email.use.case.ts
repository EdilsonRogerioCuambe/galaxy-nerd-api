import { InstructorsRepository } from '@/repositories/instructors.repository'
import { Instructor } from '@prisma/client'
import { InstructorNotFoundError } from './err/instructor.not.found.error'

interface GetInstructorByEmailUseCaseProps {
  email: string
}

interface GetInstructorByEmailUseCaseResponse {
  instructor: Instructor
}

export class GetInstructorByEmailUseCase {
  constructor(private readonly instructorsRepository: InstructorsRepository) {}

  async execute({
    email,
  }: GetInstructorByEmailUseCaseProps): Promise<GetInstructorByEmailUseCaseResponse> {
    const instructor = await this.instructorsRepository.findByEmail(email)

    if (!instructor) {
      throw new InstructorNotFoundError()
    }

    return { instructor }
  }
}
