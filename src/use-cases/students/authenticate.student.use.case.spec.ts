import { hash } from 'bcryptjs'
import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { AuthenticateStudentUseCase } from './authenticate.student.use.case'
import { InvalidCredentialsError } from './err/student.invalid.credentials.error'

let sut: AuthenticateStudentUseCase
let studentsRepository: InMemoryStudentsRepository

describe('Authenticate Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new AuthenticateStudentUseCase(studentsRepository)
  })

  it('should throw if student does not exist', async () => {
    const promise = sut.execute({
      email: 'invalid_email',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate a student', async () => {
    await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'STUDENT',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    const { student } = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    })

    expect(student.id).toEqual(expect.any(String))
  })

  it('should throw if password does not match', async () => {
    await studentsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'STUDENT',
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
