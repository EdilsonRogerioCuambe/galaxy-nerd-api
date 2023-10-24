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
      instructorId,
      slug,
      level: levelOne,
      thumbnail: thumbnailOne,
      image: imageOne,
      shortDescription: shortDescriptionOne,
      duration: durationOne,
    })

    const response = await sut.execute({ courseId: course.id })

    expect(response.course).toEqual(
      expect.objectContaining({
        id: course.id,
        title,
        description,
        price,
        instructorId,
        slug,
        level: levelOne,
        thumbnail: thumbnailOne,
        image: imageOne,
        shortDescription: shortDescriptionOne,
        duration: durationOne,
      }),
    )
  })

  it('should not be able to get a course by id if course does not exists', async () => {
    await expect(
      sut.execute({ courseId: 'any_course_id' }),
    ).rejects.toBeInstanceOf(CourseNotFoundError)
  })
})
