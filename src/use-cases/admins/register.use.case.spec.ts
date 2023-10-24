import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterAdminUseCase } from './register.use.case'
import { compare } from 'bcryptjs'
import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'
import { AdminAlreadyExistsError } from './err/admin.already.exists.error'

let sut: RegisterAdminUseCase
let adminsRepository: InMemoryAdminsRepository

describe('register admin use case', () => {
  beforeEach(async () => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new RegisterAdminUseCase(adminsRepository)
  })

  it('should hash admin password before saving', async () => {
    const { admin } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      banner: 'any_banner',
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
    })

    const adminPasswordIsHashed = await compare('any_password', admin.password)

    expect(adminPasswordIsHashed).toBe(true)
  })

  it('should not be able to register an admin with an email that already exists', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      banner: 'any_banner',
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
    })

    expect(async () => {
      await sut.execute({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        banner: 'any_banner',
        role: 'ADMIN',
        biography: 'any_biography',
        location: 'any_location',
      })
    }).rejects.toBeInstanceOf(AdminAlreadyExistsError)
  })

  it('should be able to register a new admin', async () => {
    const { admin } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      banner: 'any_banner',
      password: 'any_password',
      avatar: 'any_avatar',
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
    })

    expect(admin).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: admin.password,
      banner: 'any_banner',
      avatar: 'any_avatar',
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    })
    expect(admin.password).not.toBe('any_password')
    expect(admin.password).toHaveLength(60)
  })
})
