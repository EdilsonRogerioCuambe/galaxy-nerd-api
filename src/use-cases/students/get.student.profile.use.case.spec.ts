import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { GetStudentProfileUseCase } from './get.student.profile.use.case'
import { StudentNotFoundError } from './err/student.not.found.error'

let studentsRepository: InMemoryStudentsRepository
let sut: GetStudentProfileUseCase

describe('Get Student Profile Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new GetStudentProfileUseCase(studentsRepository)
  })

  it('should be able to get student profile', async () => {
    const student = await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'STUDENT',
      socialLinks: ['any_social_link'],
    })

    const response = await sut.execute({
      studentId: student.id,
    })

    expect(response.student).toEqual(student)
  })

  it('should not be able to get student profile if student does not exists', async () => {
    await expect(
      sut.execute({
        studentId: 'any_id',
      }),
    ).rejects.toBeInstanceOf(StudentNotFoundError)
  })
})
