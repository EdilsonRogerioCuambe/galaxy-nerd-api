import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterCourseUseCase } from './register.course.use.case'
import { slugify } from '@/utils/slug'

let sut: RegisterCourseUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Register Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new RegisterCourseUseCase(coursesRepository)
  })

  it('should be able to register a new course', async () => {
    const title = 'any_title'
    const description = 'any_description'
    const price = '0'
    const instructorId = 'any_instructor_id'
    const levelOne = 'any_level'
    const thumbnailOne = 'any_thumbnail'
    const imageOne = 'any_image'
    const shortDescriptionOne = 'any_short_description'
    const durationOne = 'any_duration'

    const response = await sut.execute({
      title,
      description,
      price,
      instructorId,
      level: levelOne,
      thumbnail: thumbnailOne,
      image: imageOne,
      shortDescription: shortDescriptionOne,
      duration: durationOne,
    })

    const slug = slugify({ slug: title })

    expect(response.course).toEqual({
      id: 'any_id',
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
      updatedAt: response.course.updatedAt,
      createdAt: response.course.createdAt,
    })
  })
})
