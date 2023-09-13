import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { GetTopicUseCase } from './get.topic.use.case'
import { TopicNotFoundError } from './err/topic.not.found.error'
import { slugify } from '@/utils/slug'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: GetTopicUseCase
let topicsRepository: InMemoryTopicsRepository

describe('Get Topic Use Case', () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new GetTopicUseCase(topicsRepository)
  })

  it('should throw TopicNotFoundError if topic is not found', async () => {
    const id = 'topic-id'

    await expect(sut.execute({ id })).rejects.toBeInstanceOf(TopicNotFoundError)
  })

  it('should return topic if topic is found', async () => {
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

    const response = await sut.execute({ id: topic.id })

    expect(response.topic).toEqual(topic)
  })
})
