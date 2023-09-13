import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'
import { GetTopicUseCase } from '@/use-cases/topics/get.topic.use.case'

export function makeGetTopicUseCase(): GetTopicUseCase {
  const topicsRepository = new PrismaTopicsRepository()
  const getTopicUseCase = new GetTopicUseCase(topicsRepository)

  return getTopicUseCase
}
