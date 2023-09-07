import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { DeleteStudentUseCase } from './delete.student.use.case'
import { StudentNotFoundError } from './err/student.not.found.error'
import { it, describe, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'

let sut: DeleteStudentUseCase
let studentsRepository: InMemoryStudentsRepository

describe('Delete Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new DeleteStudentUseCase(studentsRepository)
  })

  it('should delete a student', async () => {
    const student = await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'STUDENT',
      avatar: 'any_avatar',
      biography: 'any_biography',
      interests: ['any_interest'],
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    await sut.execute({ studentId: student.id })

    const studentExists = await studentsRepository.findById(student.id)

    const students = await studentsRepository.findAll()
    expect(studentExists).toBeNull()
    expect(students).toHaveLength(0)
  })

  it('should throw if student is not found', async () => {
    const promise = sut.execute({ studentId: 'invalid_id' })

    await expect(promise).rejects.toThrow(StudentNotFoundError)
  })
})
