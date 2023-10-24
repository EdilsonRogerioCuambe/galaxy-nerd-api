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
    const instructorIdOne = 'any_instructor_id'
    const levelOne = 'any_level'
    const thumbnailOne = 'any_thumbnail'
    const imageOne = 'any_image'
    const shortDescriptionOne = 'any_short_description'
    const durationOne = 'any_duration'

    const slugOne = slugify({ slug: titleOne })

    await coursesRepository.create({
      title: titleOne,
      description: descriptionOne,
      price: priceOne,
      instructorId: instructorIdOne,
      slug: slugOne,
      level: levelOne,
      thumbnail: thumbnailOne,
      image: imageOne,
      shortDescription: shortDescriptionOne,
      duration: durationOne,
    })

    const titleTwo = 'any_title'
    const descriptionTwo = 'any_description'
    const priceTwo = '0'
    const instructorIdTwo = 'any_instructor_id'
    const levelTwo = 'any_level'
    const thumbnailTwo = 'any_thumbnail'
    const imageTwo = 'any_image'
    const shortDescriptionTwo = 'any_short_description'
    const durationTwo = 'any_duration'

    const slugTwo = slugify({ slug: titleTwo })

    await coursesRepository.create({
      title: titleTwo,
      description: descriptionTwo,
      price: priceTwo,
      instructorId: instructorIdTwo,
      slug: slugTwo,
      level: levelTwo,
      thumbnail: thumbnailTwo,
      image: imageTwo,
      shortDescription: shortDescriptionTwo,
      duration: durationTwo,
    })

    const response = await sut.execute()

    expect(response.courses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: titleOne,
          description: descriptionOne,
          price: priceOne,
          instructorId: instructorIdOne,
          slug: slugOne,
          level: levelOne,
          thumbnail: thumbnailOne,
          image: imageOne,
          shortDescription: shortDescriptionOne,
          duration: durationOne,
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: titleTwo,
          description: descriptionTwo,
          price: priceTwo,
          instructorId: instructorIdTwo,
          slug: slugTwo,
          level: levelTwo,
          thumbnail: thumbnailTwo,
          image: imageTwo,
          shortDescription: shortDescriptionTwo,
          duration: durationTwo,
        }),
      ]),
    )
  })
})
