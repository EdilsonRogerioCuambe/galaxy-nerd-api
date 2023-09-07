import { InstructorsRepository } from '@/repositories/instructors.repository'
import { Instructor } from '@prisma/client'
import { InvalidCredentialsError } from './err/instructor.invalid.credentials'
import { compare } from 'bcryptjs'

interface AuthenticateInstructorsUseCaseProps {
  email: string
  password: string
}

interface AuthenticateInstructorsUseCaseResponse {
  instructor: Instructor
}

export class AuthenticateInstructorsUseCase {
  constructor(private instructorsRepository: InstructorsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateInstructorsUseCaseProps): Promise<AuthenticateInstructorsUseCaseResponse> {
    const instructor = await this.instructorsRepository.findByEmail(email)

    if (!instructor) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, instructor.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { instructor }
  }
}
