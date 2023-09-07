import { InstructorsRepository } from '@/repositories/instructors.repository'

export class GetAllInstructorsUseCase {
  constructor(private instructorsRepository: InstructorsRepository) {}

  async execute() {
    const instructors = await this.instructorsRepository.findAll()

    return { instructors }
  }
}
