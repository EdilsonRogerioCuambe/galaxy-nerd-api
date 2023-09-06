import { it, describe, beforeEach, expect } from 'vitest'
import { AuthenticateAdminsUseCase } from './authenticate.use.case'
import { InMemoryAdminsRepository } from '@/repositories/in-memory-repositories/in.memory.admins.repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './err/admin.invalid.credentials'

let sut: AuthenticateAdminsUseCase
let adminsRepository: InMemoryAdminsRepository

describe('Authenticate Admins Use Case', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    sut = new AuthenticateAdminsUseCase(adminsRepository)
  })

  it('should throw if admin does not exist', async () => {
    const promise = sut.execute({
      email: 'invalid_email',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate an admin', async () => {
    await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'ADMIN',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    const { admin } = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    })

    expect(admin.id).toEqual(expect.any(String))
  })

  it('should throw if password does not match', async () => {
    await adminsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'ADMIN',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    const promise = sut.execute({
      email: 'any_email',
      password: 'invalid_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
