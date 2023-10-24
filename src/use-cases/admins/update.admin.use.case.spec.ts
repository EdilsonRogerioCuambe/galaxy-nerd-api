import { it, describe, expect, beforeEach } from 'vitest'
import { UpdateAdminUseCase } from './update.admin.use.case'
import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'

let sut: UpdateAdminUseCase
let adminsRepository: InMemoryAdminsRepository

describe('Update Admin Use Case', () => {
  beforeEach(async () => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new UpdateAdminUseCase(adminsRepository)
  })

  it('should update an admin', async () => {
    const newAdmin = await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'ADMIN',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      banner: 'any_banner',
    })

    const { admin } = await sut.execute({
      adminId: 'any_id',
      name: 'updated_name',
      email: 'updated_email',
      password: 'updated_password',
      avatar: 'updated_avatar',
      biography: 'updated_biography',
      location: 'updated_location',
      role: 'ADMIN',
      banner: 'updated_banner',
    })

    expect(admin).toEqual({
      id: 'any_id',
      name: 'updated_name',
      email: 'updated_email',
      password: admin.password,
      avatar: 'updated_avatar',
      biography: 'updated_biography',
      location: 'updated_location',
      banner: 'updated_banner',
      role: 'ADMIN',
      createdAt: newAdmin.createdAt,
      updatedAt: admin.updatedAt,
    })
  })
})
