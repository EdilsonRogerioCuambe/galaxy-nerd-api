import { InstructorsRepository } from '@/repositories/instructors.repository'
import { InstructorNotFoundError } from './err/instructor.not.found.error'

interface DeleteInstructorUseCaseProps {
  instructorId: string
}

export class DeleteInstructorUseCase {
  constructor(private readonly instructorsRepository: InstructorsRepository) {}

  async execute({ instructorId }: DeleteInstructorUseCaseProps): Promise<void> {
    const instructor = await this.instructorsRepository.findById(instructorId)

    if (!instructor) {
      throw new InstructorNotFoundError()
    }

    await this.instructorsRepository.delete(instructorId)
  }
}
