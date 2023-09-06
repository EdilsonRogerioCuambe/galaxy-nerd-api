import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'
import { DeleteAdminUseCase } from './delete.admin.use.case'
import { it, describe, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'

let sut: DeleteAdminUseCase
let adminsRepository: InMemoryAdminsRepository

describe('Delete Admin Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new DeleteAdminUseCase(adminsRepository)
  })

  it('should delete an admin', async () => {
    const admin = await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'ADMIN',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    await sut.execute({ adminId: admin.id })

    const adminExists = await adminsRepository.findById(admin.id)

    const admins = await adminsRepository.findAll()
    expect(adminExists).toBeNull()
    expect(admins).toHaveLength(0)
  })
})
