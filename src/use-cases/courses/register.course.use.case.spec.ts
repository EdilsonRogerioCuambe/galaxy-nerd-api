import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterCourseUseCase } from './register.course.use.case'

let sut: RegisterCourseUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Register Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new RegisterCourseUseCase(coursesRepository)
  })

  it('should be able to register a new course', async () => {
    const response = await sut.execute({
      title: 'any_title',
      description: 'any_description',
      price: '0',
      categoryId: 'any_category_id',
      instructorId: 'any_instructor_id',
      studentId: 'any_student_id',
    })

    expect(response.course).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'any_title',
        description: 'any_description',
        categoryId: 'any_category_id',
        instructorId: 'any_instructor_id',
        studentId: 'any_student_id',
      }),
    )
  })
})
