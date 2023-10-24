import { it, expect, beforeEach, describe } from 'vitest'
import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'
import { GetAllAdminsUseCase } from './get.all.admins.use.case'

let sut: GetAllAdminsUseCase
let adminsRepository: InMemoryAdminsRepository

describe('Get All Admins Use Case', () => {
  beforeEach(async () => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new GetAllAdminsUseCase(adminsRepository)
  })

  it('should be able to get all admins', async () => {
    await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'ADMIN',
    })

    await adminsRepository.create({
      name: 'any_name_1',
      email: 'any_email_1',
      password: 'any_password_1',
      avatar: 'any_avatar_1',
      biography: 'any_biography_1',
      location: 'any_location_1',
      role: 'ADMIN',
    })

    const response = await sut.execute()
    expect(response.admins).toHaveLength(2)
    expect(response.admins[0].name).toBe('any_name')
    expect(response.admins[1].name).toBe('any_name_1')
  })
})
