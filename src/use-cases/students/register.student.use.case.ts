import { StudentsRepository } from '@/repositories/students.repository'
import { Student } from '@prisma/client'
import { hash } from 'bcryptjs'
import { StudentAlreadyExistsError } from './err/student.already.exists.error'

interface RegisterStudentUseCaseProps {
  name: string
  email: string
  banner?: string
  password: string
  avatar?: string
  biography?: string
  location?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  github?: string
  website?: string
  interests?: string[]
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
}

interface RegisterStudentUseCaseResponse {
  student: Student
}

export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    name,
    email,
    password,
    avatar,
    biography,
    location,
    interests,
    role,
    banner,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
    website,
  }: RegisterStudentUseCaseProps): Promise<RegisterStudentUseCaseResponse> {
    const hashedPassword = await hash(password, 12)

    const emailAlreadyExists = await this.studentsRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new StudentAlreadyExistsError()
    }

    const student = await this.studentsRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      biography,
      location,
      role,
      banner,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github,
      website,
      interests: {
        connect: interests?.map((interest) => ({ id: interest })),
      },
    })

    return { student }
  }
}
