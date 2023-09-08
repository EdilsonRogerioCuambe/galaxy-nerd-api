import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { GetAllCoursesUseCase } from '@/use-cases/courses/get.all.courses.use.case'
import { it, describe, expect, beforeEach } from 'vitest'
import { slugify } from '@/utils/slug'

let sut: GetAllCoursesUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Get All Courses Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new GetAllCoursesUseCase(coursesRepository)
  })

  it('should be able to get all courses', async () => {
    const titleOne = 'any_title'
    const descriptionOne = 'any_description'
    const priceOne = '0'
    const categoryIdOne = 'any_category_id'
    const instructorIdOne = 'any_instructor_id'
    const studentIdOne = 'any_student_id'

    const slugOne = slugify({ slug: titleOne })

    await coursesRepository.create({
      title: titleOne,
      description: descriptionOne,
      price: priceOne,
      categoryId: categoryIdOne,
      instructorId: instructorIdOne,
      studentId: studentIdOne,
      slug: slugOne,
    })

    const titleTwo = 'any_title'
    const descriptionTwo = 'any_description'
    const priceTwo = '0'
    const categoryIdTwo = 'any_category_id'
    const instructorIdTwo = 'any_instructor_id'
    const studentIdTwo = 'any_student_id'

    const slugTwo = slugify({ slug: titleTwo })

    await coursesRepository.create({
      title: titleTwo,
      description: descriptionTwo,
      price: priceTwo,
      categoryId: categoryIdTwo,
      instructorId: instructorIdTwo,
      studentId: studentIdTwo,
      slug: slugTwo,
    })

    const response = await sut.execute()

    expect(response.courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: titleOne,
          description: descriptionOne,
          price: priceOne,
          categoryId: categoryIdOne,
          instructorId: instructorIdOne,
          studentId: studentIdOne,
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: titleTwo,
          description: descriptionTwo,
          price: priceTwo,
          categoryId: categoryIdTwo,
          instructorId: instructorIdTwo,
          studentId: studentIdTwo,
        }),
      ]),
    )
  })
})
