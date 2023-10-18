import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { compare } from 'bcryptjs'
import { RegisterStudentUseCase } from './register.student.use.case'
import { StudentAlreadyExistsError } from './err/student.already.exists.error'
import { it, expect, describe, beforeEach } from 'vitest'

let sut: RegisterStudentUseCase
let studentsRepository: InMemoryStudentsRepository

describe('Register Student Use Case', () => {
  beforeEach(async () => {
    studentsRepository = new InMemoryStudentsRepository()
    sut = new RegisterStudentUseCase(studentsRepository)
  })

  it('should hash student password before saving', async () => {
    const { student } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'STUDENT',
      biography: 'any_biography',
      location: 'any_location',
      banner: 'any_banner',
    })

    const studentPasswordIsHashed = await compare(
      'any_password',
      student.password,
    )

    expect(studentPasswordIsHashed).toBe(true)
  })

  it('should not be able to register a student with an email that already exists', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      socialLinks: ['any_social_link', 'any_social_link'],
      role: 'STUDENT',
      biography: 'any_biography',
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
        role: 'STUDENT',
        biography: 'any_biography',
        location: 'any_location',
        banner: 'any_banner',
      })
    }).rejects.toBeInstanceOf(StudentAlreadyExistsError)
  })
})
