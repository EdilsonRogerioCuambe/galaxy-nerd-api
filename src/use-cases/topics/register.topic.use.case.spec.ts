import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterTopicUseCase } from './register.topic.use.case'
import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { TopicAlreadyExistsError } from './err/topic.already.exists.error'
import { slugify } from '@/utils/slug'

let sut: RegisterTopicUseCase
let topicsRepository: InMemoryTopicsRepository

describe('Register Topic Use Case', () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new RegisterTopicUseCase(topicsRepository)
  })

  it('should be able to register a new topic', async () => {
    const response = await sut.execute({
      title: 'any_title',
      order: '1',
      courseId: 'any_course_id',
      description: 'any_description',
      icon: 'any_icon',
    })

    expect(response.topic.id).toBeDefined()
    expect(response.topic.title).toBe('any_title')
    expect(response.topic.order).toBe('1')
    expect(response.topic.courseId).toBe('any_course_id')
    expect(response.topic.description).toBe('any_description')
    expect(response.topic.icon).toBe('any_icon')
  })

  it('should not be able to register a new topic with an existing title', async () => {
    const title = 'any_title'
    const slugifiedTitle = slugify({ slug: title })

    await topicsRepository.create({
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

    await expect(
      sut.execute({
        title: 'any_title',
        order: '1',
        courseId: 'any_course_id',
        description: 'any_description',
        icon: 'any_icon',
      }),
    ).rejects.toBeInstanceOf(TopicAlreadyExistsError)
  })
})
