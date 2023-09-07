import { StudentsRepository } from '@/repositories/students.repository'
import { Student } from '@prisma/client'
import { StudentNotFoundError } from './err/student.not.found.error'

interface GetStudentProfileUseCaseProps {
  studentId: string
}

interface GetStudentProfileUseCaseResponse {
  student: Student
}

export class GetStudentProfileUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async execute({
    studentId,
  }: GetStudentProfileUseCaseProps): Promise<GetStudentProfileUseCaseResponse> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      throw new StudentNotFoundError()
    }

    return { student }
  }
}
