import { StudentsRepository } from '@/repositories/students.repository'
import { Student } from '@prisma/client'
import { hash } from 'bcryptjs'
import { StudentAlreadyExistsError } from './err/student.already.exists.error'

interface RegisterStudentUseCaseProps {
  name: string
  email: string
  password: string
  avatar?: string
  biography?: string
  location?: string
  socialLinks?: string[]
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
    socialLinks,
    interests,
    role,
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
      socialLinks,
      interests,
      role,
    })

    return { student }
  }
}
