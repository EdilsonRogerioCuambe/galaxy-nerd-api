import { PrismaTopicsRepository } from '@/repositories/prisma-repositories/prisma.topics.repository'
import { GetAllTopicsUseCase } from '@/use-cases/topics/get.all.topics.use.case'

export function makeGetAllTopicsUseCase(): GetAllTopicsUseCase {
  const prismaTopicsRepository = new PrismaTopicsRepository()

  const getAllTopicsUseCase = new GetAllTopicsUseCase(prismaTopicsRepository)

  return getAllTopicsUseCase
}
