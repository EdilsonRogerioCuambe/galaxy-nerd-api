import { StudentsRepository } from '@/repositories/students.repository'

interface DeleteStudentUseCaseProps {
  studentId: string
}

export class DeleteStudentUseCase {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async execute({ studentId }: DeleteStudentUseCaseProps): Promise<void> {
    await this.studentsRepository.findById(studentId)

    await this.studentsRepository.delete(studentId)
  }
}
