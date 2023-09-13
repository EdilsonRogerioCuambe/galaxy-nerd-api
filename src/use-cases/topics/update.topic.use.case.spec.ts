import { it, describe, expect, beforeEach } from 'vitest'
import { slugify } from '@/utils/slug'
import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { UpdateTopicUseCase } from './update.topic.use.case'
import { TopicNotFoundError } from './err/topic.not.found.error'

let sut: UpdateTopicUseCase
let topicsRepository: InMemoryTopicsRepository

describe('Update Topic Use Case', () => {
  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    sut = new UpdateTopicUseCase(topicsRepository)
  })

  it('should update a topic', async () => {
    const title = 'Topic Title'
    const icon = 'Topic Icon'
    const description = 'Topic Description'
    const order = '1'
    const courseId = 'Topic Course Id'

    const slug = slugify({ slug: title })

    const topic = await topicsRepository.create({
      title,
      icon,
      description,
      order,
      slug,
      course: {
        connect: {
          id: courseId,
        },
      },
    })

    const newTitle = 'New Topic Title'
    const newIcon = 'New Topic Icon'
    const newDescription = 'New Topic Description'
    const newOrder = '2'
    const newCourseId = 'New Topic Course Id'

    const response = await sut.execute({
      id: topic.id,
      title: newTitle,
      icon: newIcon,
      description: newDescription,
      order: newOrder,
      courseId: newCourseId,
    })

    expect(response.topic).toEqual({
      id: topic.id,
      title: newTitle,
      icon: newIcon,
      description: newDescription,
      order: newOrder,
      slug: response.topic.slug,
      courseId: newCourseId,
      createdAt: topic.createdAt,
      updatedAt: response.topic.updatedAt,
    })
  })

  it('should throw if topic does not exist', async () => {
    const title = 'title'
    const icon = 'icon'
    const description = 'description'
    const order = 'order'
    const courseId = 'course_id'

    const slug = slugify({ slug: title })

    const topic = await topicsRepository.create({
      title,
      icon,
      description,
      order,
      slug,
      course: {
        connect: {
          id: courseId,
        },
      },
    })

    await expect(
      sut.execute({
        id: 'wrong_id',
        title: topic.title,
        order: topic.order,
        courseId: topic.courseId,
        description: topic.description || '',
        icon: topic.icon || '',
      }),
    ).rejects.toThrow(new TopicNotFoundError())
  })
})
