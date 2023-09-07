import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { UpdateStudentUseCase } from './update.student.use.case'
import { StudentNotFoundError } from './err/student.not.found.error'
import { expect, it, beforeEach, describe } from 'vitest'
import { compare } from 'bcryptjs'

let studentsRepository: InMemoryStudentsRepository
let sut: UpdateStudentUseCase

describe('Update Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new UpdateStudentUseCase(studentsRepository)
  })

  it('should be able to update a student', async () => {
    const student = await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'STUDENT',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
      interests: ['any_interest'],
    })

    const updatedStudent = await sut.execute({
      name: 'updated_name',
      email: 'updated_email',
      password: 'updated_password',
      role: 'STUDENT',
      avatar: 'updated_avatar',
      biography: 'updated_biography',
      location: 'updated_location',
      socialLinks: ['updated_social_link'],
      interests: [
        'updated_interest',
        'updated_interest_2',
        'updated_interest_3',
      ],
      studentId: student.id,
    })

    const studentPasswordIsHashed = await compare(
      'updated_password',
      updatedStudent.student.password,
    )

    expect(updatedStudent.student.name).toBe('updated_name')
    expect(updatedStudent.student.email).toBe('updated_email')
    expect(studentPasswordIsHashed).toBe(true)
    expect(updatedStudent.student.role).toBe('STUDENT')
    expect(updatedStudent.student.avatar).toBe('updated_avatar')
    expect(updatedStudent.student.biography).toBe('updated_biography')
    expect(updatedStudent.student.location).toBe('updated_location')
    expect(updatedStudent.student.socialLinks).toEqual(['updated_social_link'])
    expect(updatedStudent.student.interests).toEqual(['updated_interest'])
  })

  it('should not be able to update a student if it does not exist', async () => {
    await expect(
      sut.execute({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        role: 'STUDENT',
        avatar: 'any_avatar',
        biography: 'any_biography',
        location: 'any_location',
        socialLinks: ['any_social_link'],
        interests: ['any_interest'],
        studentId: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(StudentNotFoundError)
  })
})
