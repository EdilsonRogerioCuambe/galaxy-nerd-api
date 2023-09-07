import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { UpdateCourseUseCase } from './update.course.use.case'
import { CourseNotFoundError } from './err/course.not.found.error'
import { it, describe, expect, beforeEach } from 'vitest'
import { slugify } from '@/utils/slug'

let sut: UpdateCourseUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Update Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new UpdateCourseUseCase(coursesRepository)
  })

  it('should update a course', async () => {
    const title = 'title'
    const description = 'description'
    const price = 'price'
    const thumbnail = 'thumbnail'
    const categoryId = 'category_id'
    const instructorId = 'instructor_id'

    const slug = slugify({ slug: title })

    const course = await coursesRepository.create({
      title,
      description,
      price,
      slug,
      thumbnail,
      categoryId,
      instructorId,
    })

    const newDescription = 'new_description'
    const newPrice = 'new_price'
    const newThumbnail = 'new_thumbnail'
    const newCategoryId = 'new_category_id'
    const newInstructorId = 'instructor_id'

    const response = await sut.execute({
      courseId: course.id,
      title: course.title,
      description: newDescription,
      price: newPrice,
      thumbnail: newThumbnail,
      categoryId: newCategoryId,
      instructorId: newInstructorId,
    })

    expect(response.course).toEqual({
      id: course.id,
      title: course.title,
      description: 'new_description',
      price: 'new_price',
      slug: course.slug,
      instructorId: 'instructor_id',
      categoryId: 'new_category_id',
      thumbnail: response.course.thumbnail,
      studentId: undefined,
      createdAt: course.createdAt,
      updatedAt: response.course.updatedAt,
    })
  })

  it('should throw if course is not found', async () => {
    const promise = sut.execute({
      courseId: 'invalid_id',
      title: 'new_title',
      description: 'new_description',
      price: 'new_price',
      thumbnail: 'new_thumbnail',
      categoryId: 'new_category_id',
      instructorId: 'new_instructor_id',
    })

    await expect(promise).rejects.toBeInstanceOf(CourseNotFoundError)
  })
})
