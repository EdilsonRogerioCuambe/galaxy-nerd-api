import { it, expect, beforeEach, describe } from 'vitest'
import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { GetAllStudentsUseCase } from './get.all.students.use.case'

let sut: GetAllStudentsUseCase
let studentsRepository: InMemoryStudentsRepository

describe('Get All Students Use Case', () => {
  beforeEach(async () => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new GetAllStudentsUseCase(studentsRepository)
  })

  it('should be able to get all students', async () => {
    await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'STUDENT',
      socialLinks: ['any_socialLinks'],
    })

    await studentsRepository.create({
      name: 'any_name_1',
      email: 'any_email_1',
      password: 'any_password_1',
      avatar: 'any_avatar_1',
      biography: 'any_biography_1',
      location: 'any_location_1',
      role: 'STUDENT',
      socialLinks: ['any_socialLinks_1'],
    })

    const response = await sut.execute()
    expect(response.students).toHaveLength(2)
    expect(response.students[0].name).toBe('any_name')
    expect(response.students[1].name).toBe('any_name_1')
  })
})
