import { StudentsRepository } from '@/repositories/students.repository'
import { StudentNotFoundError } from './err/student.not.found.error'

interface DeleteStudentUseCaseProps {
  studentId: string
}

export class DeleteStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async execute({ studentId }: DeleteStudentUseCaseProps): Promise<void> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      throw new StudentNotFoundError()
    }

    await this.studentsRepository.delete(studentId)
  }
}
