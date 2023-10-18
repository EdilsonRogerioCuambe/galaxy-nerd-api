import { it, describe, expect, beforeEach } from 'vitest'
import { GetCourseBySlugUseCase } from './get.course.by.slug.use.case'
import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { CourseNotFoundError } from './err/course.not.found.error'
import { slugify } from '@/utils/slug'

let sut: GetCourseBySlugUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Get Course By Slug Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new GetCourseBySlugUseCase(coursesRepository)
  })

  it('should be able to get a course by slug', async () => {
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

    const response = await sut.execute({ slug })

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

  it('should not be able to get a course by slug if it does not exist', async () => {
    await expect(sut.execute({ slug: 'any_slug' })).rejects.toBeInstanceOf(
      CourseNotFoundError,
    )
  })
})
