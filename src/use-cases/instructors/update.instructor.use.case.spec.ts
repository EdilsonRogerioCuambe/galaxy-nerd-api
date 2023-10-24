import { it, describe, expect, beforeEach } from 'vitest'
import { UpdateInstructorUseCase } from './update.instructor.use.case'
import { InMemoryInstructorsRepository } from '@/repositories/in-memory-repositories/in.memory.instructors.repository'

let sut: UpdateInstructorUseCase
let instructorsRepository: InMemoryInstructorsRepository

describe('Update Instructor Use Case', () => {
  beforeEach(async () => {
    instructorsRepository = new InMemoryInstructorsRepository()
    sut = new UpdateInstructorUseCase(instructorsRepository)
  })

  it('should update an instructor', async () => {
    const newInstructor = await instructorsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'INSTRUCTOR',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      banner: 'any_banner',
    })

    const { instructor } = await sut.execute({
      instructorId: 'any_id',
      name: 'updated_name',
      email: 'updated_email',
      password: 'updated_password',
      avatar: 'updated_avatar',
      biography: 'updated_biography',
      location: 'updated_location',
      role: 'INSTRUCTOR',
      banner: 'updated_banner',
    })

    expect(instructor).toEqual({
      id: 'any_id',
      name: 'updated_name',
      email: 'updated_email',
      password: instructor.password,
      avatar: 'updated_avatar',
      biography: 'updated_biography',
      location: 'updated_location',
      banner: 'updated_banner',
      role: 'INSTRUCTOR',
      createdAt: newInstructor.createdAt,
      updatedAt: instructor.updatedAt,
    })
  })
})
