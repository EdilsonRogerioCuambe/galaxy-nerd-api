import { InstructorsRepository } from '@/repositories/instructors.repository'
import { InstructorNotFoundError } from './err/instructor.not.found.error'
import { Instructor, Role } from '@prisma/client'

interface UpdateInstructorUseCaseProps {
  instructorId: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  biography?: string
  location?: string
  socialLinks?: string[]
  role?: Role
}

interface UpdateInstructorUseCaseResponse {
  instructor: Instructor
}

export class UpdateInstructorUseCase {
  constructor(private readonly instructorsRepository: InstructorsRepository) {}

  async execute({
    instructorId,
    name,
    email,
    password,
    avatar,
    biography,
    location,
    socialLinks,
    role,
  }: UpdateInstructorUseCaseProps): Promise<UpdateInstructorUseCaseResponse> {
    const instructor = await this.instructorsRepository.findById(instructorId)

    if (!instructor) {
      throw new InstructorNotFoundError()
    }

    const updatedInstructor = await this.instructorsRepository.update(
      instructorId,
      {
        name,
        email,
        password,
        avatar,
        biography,
        location,
        socialLinks,
        role,
      },
    )

    return {
      instructor: updatedInstructor,
    }
  }
}
