import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'
import { RegisterTopicUseCase } from '@/use-cases/topics/register.topic.use.case'

export function makeRegisterTopicUseCase() {
  const prismaTopicsRepository = new PrismaTopicsRepository()
  const registerTopicUseCase = new RegisterTopicUseCase(prismaTopicsRepository)

  return registerTopicUseCase
}
