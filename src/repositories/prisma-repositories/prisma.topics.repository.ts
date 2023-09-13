import { Prisma } from '@prisma/client'
import { TopicsRepository } from '../topics.repository'
import { prisma } from '@/lib/prisma'

export class PrismaTopicsRepository implements TopicsRepository {
  async create(data: Prisma.TopicCreateInput) {
    const topic = await prisma.topic.create({
      data,
    })

    return topic
  }

  async findAll() {
    const topics = await prisma.topic.findMany()

    return topics
  }

  async findById(id: string) {
    const topic = await prisma.topic.findUnique({
      where: { id },
    })

    return topic
  }

  async findByTitle(title: string) {
    const topic = await prisma.topic.findFirst({
      where: { title },
    })

    return topic
  }

  async update(id: string, data: Prisma.TopicUpdateInput) {
    const topic = await prisma.topic.update({
      where: { id },
      data,
    })

    return topic
  }

  async delete(id: string): Promise<void> {
    await prisma.topic.delete({
      where: { id },
    })
  }
}
