import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'
import { AuthenticateInstructorsUseCase } from './authenticate.use.case'
import { InvalidCredentialsError } from './err/instructor.invalid.credentials'
import { hash } from 'bcryptjs'

let sut: AuthenticateInstructorsUseCase
let instructorsRepository: InMemoryInstructorsRepository

describe('Authenticate instructors use case', () => {
  beforeEach(() => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new AuthenticateInstructorsUseCase(instructorsRepository)
  })

  it('should throw if instructor does not exist', async () => {
    const promise = sut.execute({
      email: 'invalid_email',
      password: 'any_password',
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw if password does not match', async () => {
    await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
      role: 'INSTRUCTOR',
    })

    const promise = sut.execute({
      email: 'any_email',
      password: 'invalid_password',
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate an instructor', async () => {
    await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
      role: 'INSTRUCTOR',
    })

    const { instructor } = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    })

    expect(instructor.id).toEqual(expect.any(String))
  })
})
