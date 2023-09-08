import { Prisma, Topic } from '@prisma/client'
import { TopicsRepository } from '../topics.repository'

export class InMemoryTopicsRepository implements TopicsRepository {
  private topics: Topic[] = []

  async create(data: Prisma.TopicUncheckedCreateInput): Promise<Topic> {
    const topic: Topic = {
      id: 'any_id',
      title: data.title,
      icon: data.icon !== undefined ? data.icon : null,
      description: data.description !== undefined ? data.description : null,
      order: data.order,
      courseId: data.courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.topics.push(topic)

    return topic
  }

  async findAll() {
    const topics = this.topics

    return topics
  }

  async findByTitle(title: string) {
    const topic = this.topics.find((topic) => topic.title === title)

    if (!topic) {
      return null
    }

    return topic
  }

  async findById(id: string) {
    const topic = this.topics.find((topic) => topic.id === id)

    if (!topic) {
      return null
    }

    return topic
  }

  async update(id: string, data: Prisma.TopicUncheckedUpdateInput) {
    const topic = this.topics.findIndex((topic) => topic.id === id)

    this.topics[topic] = {
      ...this.topics[topic],
      id: this.topics[topic].id,
      title: data.title as string,
      icon: data.icon as string | null,
      description: data.description as string | null,
      order: data.order as string,
      courseId: data.courseId as string,
      createdAt: this.topics[topic].createdAt,
      updatedAt: new Date(),
    }

    return this.topics[topic]
  }

  async delete(id: string): Promise<void> {
    const topic = this.topics.findIndex((topic) => topic.id === id)

    this.topics.splice(topic, 1)
  }
}
