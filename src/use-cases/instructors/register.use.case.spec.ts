import { it, expect, describe, beforeEach, afterEach } from 'vitest'
import { RegisterInstructorUseCase } from './register.use.case'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'
import { InstructorAlreadyExistsError } from './err/instructor.already.exists.error'
import { compare } from 'bcryptjs'

let sut: RegisterInstructorUseCase
let instructorsRepository: InMemoryInstructorsRepository

describe('register instructor use case', () => {
  beforeEach(async () => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new RegisterInstructorUseCase(instructorsRepository)
  })

  afterEach(async () => {
    instructorsRepository.instructors = []
  })

  it('should hash instructor password before saving', async () => {
    const { instructor } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'INSTRUCTOR',
      biography: 'any_biography',
      location: 'any_location',
      banner: 'any_banner',
      interests: ['any_interest', 'any_interest'],
    })

    const instructorPasswordIsHashed = await compare(
      'any_password',
      instructor.password,
    )

    expect(instructorPasswordIsHashed).toBe(true)
  })

  it('should not be able to register an instructor with an email that already exists', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'INSTRUCTOR',
      biography: 'any_biography',
      interests: ['any_interest', 'any_interest'],
      location: 'any_location',
      banner: 'any_banner',
    })

    expect(async () => {
      await sut.execute({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        socialLinks: ['any_social_link', 'any_social_link'],
        role: 'INSTRUCTOR',
        biography: 'any_biography',
        location: 'any_location',
        banner: 'any_banner',
        interests: ['any_interest', 'any_interest'],
      })
    }).rejects.toBeInstanceOf(InstructorAlreadyExistsError)
  })
})
