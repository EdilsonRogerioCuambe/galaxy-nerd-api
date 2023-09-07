import { StudentsRepository } from '@/repositories/students.repository'

export class GetAllStudentsUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute() {
    const students = await this.studentsRepository.findAll()

    return { students }
  }
}
