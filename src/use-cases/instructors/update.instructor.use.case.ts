import { InstructorsRepository } from '@/repositories/instructors.repository'
import { InstructorNotFoundError } from './err/instructor.not.found.error'
import { Instructor, Role } from '@prisma/client'
import { hash } from 'bcryptjs'

interface UpdateInstructorUseCaseProps {
  instructorId: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  biography?: string
  location?: string
  banner?: string
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
    role,
    banner,
  }: UpdateInstructorUseCaseProps): Promise<UpdateInstructorUseCaseResponse> {
    const instructor = await this.instructorsRepository.findById(instructorId)

    if (!instructor) {
      throw new InstructorNotFoundError()
    }

    const hashedPassword = password
      ? await hash(password, 12)
      : instructor.password

    const updatedInstructor = await this.instructorsRepository.update(
      instructorId,
      {
        name: name || instructor.name,
        email: email || instructor.email,
        password: hashedPassword,
        avatar: avatar || instructor.avatar,
        biography: biography || instructor.biography,
        location: location || instructor.location,
        role: role || instructor.role,
        banner: banner || instructor.banner,
      },
    )

    return {
      instructor: updatedInstructor,
    }
  }
}
