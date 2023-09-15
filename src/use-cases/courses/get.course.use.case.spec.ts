import { it, describe, expect, beforeEach } from 'vitest'
import { GetCourseUseCase } from './get.course.use.case'
import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { CourseNotFoundError } from './err/course.not.found.error'
import { slugify } from '@/utils/slug'

let sut: GetCourseUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Get Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new GetCourseUseCase(coursesRepository)
  })

  it('should be able to get a course by id', async () => {
    const title = 'any_title'
    const description = 'any_description'
    const price = '0'
    const categoryId = 'any_category_id'
    const instructorId = 'any_instructor_id'

    const slug = slugify({ slug: title })

    const course = await coursesRepository.create({
      title,
      description,
      price,
      categoryId,
      instructorId,
      slug,
    })

    const titleTwo = 'any_title_two'
    const descriptionTwo = 'any_description_two'
    const priceTwo = '0'
    const categoryIdTwo = 'any_category_id_two'
    const instructorIdTwo = 'any_instructor_id_two'

    const slugTwo = slugify({ slug: titleTwo })

    await coursesRepository.create({
      title: titleTwo,
      description: descriptionTwo,
      price: priceTwo,
      categoryId: categoryIdTwo,
      instructorId: instructorIdTwo,
      slug: slugTwo,
    })

    const response = await sut.execute({ courseId: course.id })

    expect(response.course).toEqual(
      expect.objectContaining({
        id: course.id,
        title,
        description,
        price,
        categoryId,
        instructorId,
        slug,
      }),
    )
  })

  it('should not be able to get a course by id if course does not exists', async () => {
    await expect(
      sut.execute({ courseId: 'any_course_id' }),
    ).rejects.toBeInstanceOf(CourseNotFoundError)
  })
})
