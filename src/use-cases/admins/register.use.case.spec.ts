import { it, expect, describe, beforeEach, afterEach } from 'vitest'
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

  afterEach(async () => {
    adminsRepository.admins = []
  })

  it('should hash admin password before saving', async () => {
    const { admin } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
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
      socialLinks: ['any_social_link', 'any_social_link'],
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
        socialLinks: ['any_social_link', 'any_social_link'],
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
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
    })

    expect(admin).toEqual({
      id: expect.any(String),
      name: 'any_name',
      email: 'any_email',
      password: expect.any(String),
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'ADMIN',
      biography: 'any_biography',
      location: 'any_location',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(admin.password).not.toBe('any_password')
    expect(admin.password).toHaveLength(60)
  })
})
