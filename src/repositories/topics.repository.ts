import { Prisma, Topic } from '@prisma/client'

export interface TopicsRepository {
  create(data: Prisma.TopicCreateInput): Promise<Topic>
  findAll(): Promise<Topic[]>
  findById(id: string): Promise<Topic | null>
  findByTitle(title: string): Promise<Topic | null>
  update(id: string, data: Prisma.TopicUpdateInput): Promise<Topic>
  delete(id: string): Promise<void>
}
