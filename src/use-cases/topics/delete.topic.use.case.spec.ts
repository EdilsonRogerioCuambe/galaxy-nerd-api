import { DeleteTopicUseCase } from './delete.topics.use.case'
import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { TopicNotFoundError } from './err/topic.not.found.error'
import { it, describe, expect, beforeEach } from 'vitest'
import { slugify } from '@/utils/slug'

let sut: DeleteTopicUseCase
let topicsRepository: InMemoryTopicsRepository

describe('Delete Topic Use Case', () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new DeleteTopicUseCase(topicsRepository)
  })

  it('should delete a topic', async () => {
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

    const newTitle = 'new_title'
    const newSlugifiedTitle = slugify({ slug: newTitle })

    const topic = await topicsRepository.create({
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

    const deletedTopic = await sut.execute({ id: topic.id })

    expect(deletedTopic.topic).toEqual(topic)
  })

  it('should throw if topic does not exist', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toBeInstanceOf(
      TopicNotFoundError,
    )
  })
})
