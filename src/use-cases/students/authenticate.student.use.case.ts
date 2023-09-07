import { StudentsRepository } from '@/repositories/students.repository'
import { compare } from 'bcryptjs'
import { Student } from '@prisma/client'
import { InvalidCredentialsError } from './err/student.invalid.credentials.error'

interface AuthenticateStudentUseCaseProps {
  email: string
  password: string
}

interface AuthenticateStudentUseCaseResponse {
  student: Student
}

export class AuthenticateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseProps): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, student.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { student }
  }
}
