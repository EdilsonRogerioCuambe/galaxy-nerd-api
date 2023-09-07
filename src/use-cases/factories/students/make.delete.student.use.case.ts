import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { DeleteStudentUseCase } from '@/use-cases/students/delete.student.use.case'

export function makeDeleteStudentUseCaseFactory() {
  const studentsRepository = new InMemoryStudentsRepository()
  const deleteStudentUseCase = new DeleteStudentUseCase(studentsRepository)

  return deleteStudentUseCase
}
