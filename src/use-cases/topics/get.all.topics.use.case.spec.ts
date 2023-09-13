import { GetAllTopicsUseCase } from './get.all.topics.use.case'
import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { slugify } from '@/utils/slug'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: GetAllTopicsUseCase
let topicsRepository: InMemoryTopicsRepository

describe('Get All Topics Use Case', () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new GetAllTopicsUseCase(topicsRepository)
  })

  it('should be able to get all topics', async () => {
    const title = 'any_title'
    const slugifiedTitle = slugify({ slug: title })

    const topic = await topicsRepository.create({
      title,
      order: '1',
      course: {
        connect: {
          id: 'any_course_id',
        },
      },
      description: 'any_description',
      icon: 'any_icon',
      slug: slugifiedTitle,
    })

    const newTitle = 'new_title'
    const newSlugifiedTitle = slugify({ slug: newTitle })

    const newTopic = await topicsRepository.create({
      title: newTitle,
      order: '2',
      course: {
        connect: {
          id: 'any_course_id',
        },
      },
      description: 'any_description',
      icon: 'any_icon',
      slug: newSlugifiedTitle,
    })

    const anotherNewTitle = 'another_new_title'
    const anotherNewSlugifiedTitle = slugify({ slug: anotherNewTitle })

    const anotherNewTopic = await topicsRepository.create({
      title: anotherNewTitle,
      order: '3',
      course: {
        connect: {
          id: 'any_course_id',
        },
      },
      description: 'any_description',
      icon: 'any_icon',
      slug: anotherNewSlugifiedTitle,
    })

    const response = await sut.execute()
    expect(response.topics).toEqual([topic, newTopic, anotherNewTopic])
  })
})
