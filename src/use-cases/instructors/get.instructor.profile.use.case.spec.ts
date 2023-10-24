import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'
import { GetInstructorProfileUseCase } from './get.instructor.profile.use.case'
import { InstructorNotFoundError } from './err/instructor.not.found.error'

let instructorsRepository: InMemoryInstructorsRepository
let sut: GetInstructorProfileUseCase

describe('Get Instructor Profile Use Case', () => {
  beforeEach(() => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new GetInstructorProfileUseCase(instructorsRepository)
  })

  it('should be able to get instructor profile', async () => {
    const instructor = await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'INSTRUCTOR',
    })

    const response = await sut.execute({
      instructorId: instructor.id,
    })

    expect(response.instructor).toEqual(instructor)
  })

  it('should not be able to get instructor profile if instructor does not exists', async () => {
    await expect(
      sut.execute({
        instructorId: 'any_id',
      }),
    ).rejects.toBeInstanceOf(InstructorNotFoundError)
  })
})
