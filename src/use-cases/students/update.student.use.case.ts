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
    const studentFound = await this.studentsRepository.findById(studentId)

    if (!studentFound) {
      throw new StudentNotFoundError()
    }

    const hashedPassword = password
      ? await hash(password, 12)
      : studentFound.password

    const student = await this.studentsRepository.update(studentId, {
      name: name || studentFound.name,
      email: email || studentFound.email,
      avatar: avatar || studentFound.avatar,
      password: hashedPassword,
      biography: biography || studentFound.biography,
      location: location || studentFound.location,
      facebook: facebook || studentFound.facebook,
      twitter: twitter || studentFound.twitter,
      instagram: instagram || studentFound.instagram,
      linkedin: linkedin || studentFound.linkedin,
      youtube: youtube || studentFound.youtube,
      github: github || studentFound.github,
      website: website || studentFound.website,
      role,
    })

    return { student }
  }
}
