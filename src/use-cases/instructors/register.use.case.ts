import { InstructorsRepository } from '@/repositories/instructors.repository'
import { hash } from 'bcryptjs'
import { Instructor } from '@prisma/client'
import { InstructorAlreadyExistsError } from './err/instructor.already.exists.error'

interface RegisterInstructorUseCaseProps {
  name: string
  email: string
  password: string
  avatar?: string
  biography?: string
  location?: string
  socialLinks?: string[]
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  banner: string
}

interface RegisterInstructorUseCaseResponse {
  instructor: Instructor
}

export class RegisterInstructorUseCase {
  constructor(private instructorsRepository: InstructorsRepository) {}

  async execute({
    name,
    email,
    password,
    avatar,
    biography,
    location,
    socialLinks,
    role,
    banner,
  }: RegisterInstructorUseCaseProps): Promise<RegisterInstructorUseCaseResponse> {
    const hashedPassword = await hash(password, 12)

    const emailAlreadyExists =
      await this.instructorsRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new InstructorAlreadyExistsError()
    }

    const instructor = await this.instructorsRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      biography,
      location,
      socialLinks,
      role,
      banner,
    })

    return { instructor }
  }
}
