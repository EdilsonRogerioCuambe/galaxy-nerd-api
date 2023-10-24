import { it, expect, beforeEach, describe } from 'vitest'
import { GetAllInstructorsUseCase } from './get.all.instrutors.use.case'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'

let sut: GetAllInstructorsUseCase
let instructorsRepository: InMemoryInstructorsRepository

describe('Get All Instructors Use Case', () => {
  beforeEach(async () => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new GetAllInstructorsUseCase(instructorsRepository)
  })

  it('should be able to get all instructors', async () => {
    await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'ADMIN',
    })

    await instructorsRepository.create({
      name: 'any_name_1',
      email: 'any_email_1',
      password: 'any_password_1',
      avatar: 'any_avatar_1',
      biography: 'any_biography_1',
      location: 'any_location_1',
      role: 'ADMIN',
    })

    const response = await sut.execute()
    expect(response.instructors).toHaveLength(2)
    expect(response.instructors[0].name).toBe('any_name')
    expect(response.instructors[1].name).toBe('any_name_1')
  })
})
