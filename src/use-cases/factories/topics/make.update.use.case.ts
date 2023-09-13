import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'
import { UpdateTopicUseCase } from '@/use-cases/topics/update.topic.use.case'

export function makeUpdateTopicUseCase(): UpdateTopicUseCase {
  const prismaTopicsRepository = new PrismaTopicsRepository()
  const updateTopicUseCase = new UpdateTopicUseCase(prismaTopicsRepository)
  return updateTopicUseCase
}
