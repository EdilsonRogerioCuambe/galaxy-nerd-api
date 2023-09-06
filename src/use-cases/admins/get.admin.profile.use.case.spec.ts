import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'
import { GetAdminProfileUseCase } from './get.admin.profile.use.case'
import { AdminNotFoundError } from './err/admin.not.found.error'

let adminsRepository: InMemoryAdminsRepository
let sut: GetAdminProfileUseCase

describe('Get Admin Profile Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new GetAdminProfileUseCase(adminsRepository)
  })

  it('should be able to get admin profile', async () => {
    const admin = await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'ADMIN',
      socialLinks: ['any_social_link'],
    })

    const response = await sut.execute({
      adminId: admin.id,
    })

    expect(response.admin).toEqual(admin)
  })

  it('should not be able to get admin profile if admin does not exists', async () => {
    await expect(
      sut.execute({
        adminId: 'any_id',
      }),
    ).rejects.toBeInstanceOf(AdminNotFoundError)
  })
})
