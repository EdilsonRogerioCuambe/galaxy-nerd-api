import { DeleteInstructorUseCase } from './delete.instructor.use.case'
import { InstructorNotFoundError } from './err/instructor.not.found.error'
import { it, describe, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'

let sut: DeleteInstructorUseCase
let instructorsRepository: InMemoryInstructorsRepository

describe('Delete Instructor Use Case', () => {
  beforeEach(() => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new DeleteInstructorUseCase(instructorsRepository)
  })

  it('should delete an instructor', async () => {
    const instructor = await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 10),
      role: 'INSTRUCTOR',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      socialLinks: ['any_social_link'],
    })

    await sut.execute({ instructorId: instructor.id })

    const instructorExists = await instructorsRepository.findById(instructor.id)

    const instructors = await instructorsRepository.findAll()
    expect(instructorExists).toBeNull()
    expect(instructors).toHaveLength(0)
  })

  it('should throw if instructor is not found', async () => {
    const promise = sut.execute({ instructorId: 'invalid_id' })

    await expect(promise).rejects.toThrow(InstructorNotFoundError)
  })
})
