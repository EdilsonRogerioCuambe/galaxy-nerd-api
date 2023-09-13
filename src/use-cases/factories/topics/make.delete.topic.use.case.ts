import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'
import { DeleteTopicUseCase } from '@/use-cases/topics/delete.topics.use.case'

export function makeDeleteTopicUseCase(): DeleteTopicUseCase {
  const prismaTopicsRepository = new PrismaTopicsRepository()
  const deleteTopicUseCase = new DeleteTopicUseCase(prismaTopicsRepository)

  return deleteTopicUseCase
}
