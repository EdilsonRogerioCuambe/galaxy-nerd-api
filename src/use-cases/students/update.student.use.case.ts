import { StudentsRepository } from '@/repositories/students.repository'
import { Student } from '@prisma/client'
import { hash } from 'bcryptjs'
import { StudentNotFoundError } from './err/student.not.found.error'

interface UpdateStudentUseCaseProps {
  studentId: string
  name?: string
  email?: string
  password: string
  avatar?: string
  biography?: string
  location?: string
  socialLinks?: string[]
  interests?: string[]
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  github?: string
  website?: string
  role?: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
}

interface UpdateStudentUseCaseResponse {
  student: Student
}

export class UpdateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    name,
    email,
    password,
    avatar,
    biography,
    location,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
    website,
    role,
    studentId,
  }: UpdateStudentUseCaseProps): Promise<UpdateStudentUseCaseResponse> {
    const hashedPassword = await hash(password, 10)

    const studentAlreadyExists =
      await this.studentsRepository.findById(studentId)

    if (!studentAlreadyExists) {
      throw new StudentNotFoundError()
    }

    const student = await this.studentsRepository.update(studentId, {
      name,
      email,
      avatar,
      password: hashedPassword,
      biography,
      location,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github,
      website,
      role,
    })

    return { student }
  }
}
