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
    const title = 'any_title'
    const description = 'any_description'
    const price = '0'
    const instructorId = 'any_instructor_id'
    const levelOne = 'any_level'
    const thumbnailOne = 'any_thumbnail'
    const imageOne = 'any_image'
    const shortDescriptionOne = 'any_short_description'
    const durationOne = 'any_duration'

    const slug = slugify({ slug: title })

    const course = await coursesRepository.create({
      title,
      description,
      price,
      slug,
      instructorId,
      level: levelOne,
      thumbnail: thumbnailOne,
      image: imageOne,
      shortDescription: shortDescriptionOne,
      duration: durationOne,
    })

    const newDescription = 'new_description'
    const newPrice = 'new_price'
    const newThumbnail = 'new_thumbnail'
    const newInstructorId = 'instructor_id'
    const newLevel = 'new_level'
    const newImage = 'new_image'
    const newShortDescription = 'new_short_description'
    const newDuration = 'new_duration'

    const response = await sut.execute({
      courseId: course.id,
      title: course.title,
      description: newDescription,
      price: newPrice,
      thumbnail: newThumbnail,
      instructorId: newInstructorId,
      level: newLevel,
      image: newImage,
      shortDescription: newShortDescription,
      duration: newDuration,
    })

    expect(response.course).toEqual({
      id: course.id,
      title: course.title,
      description: 'new_description',
      price: 'new_price',
      slug: course.slug,
      instructorId: 'instructor_id',
      thumbnail: response.course.thumbnail,
      createdAt: course.createdAt,
      updatedAt: response.course.updatedAt,
      level: 'new_level',
      image: 'new_image',
      shortDescription: 'new_short_description',
      duration: 'new_duration',
    })
  })

  it('should throw if course is not found', async () => {
    const promise = sut.execute({
      courseId: 'invalid_id',
      title: 'new_title',
      description: 'new_description',
      price: 'new_price',
      thumbnail: 'new_thumbnail',
      instructorId: 'new_instructor_id',
      level: 'new_level',
      image: 'new_image',
      shortDescription: 'new_short_description',
      duration: 'new_duration',
    })

    await expect(promise).rejects.toBeInstanceOf(CourseNotFoundError)
  })
})
