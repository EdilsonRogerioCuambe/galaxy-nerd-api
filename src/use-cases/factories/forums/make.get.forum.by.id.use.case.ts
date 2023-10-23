import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { GetForumByIdUseCase } from '@/use-cases/foruns/get.forum.by.id.use.case'

export function makeGetForumByIdUseCase() {
  const prismaForunsRepository = new PrismaForunsRepository()

  const getForumByIdUseCase = new GetForumByIdUseCase(prismaForunsRepository)

  return getForumByIdUseCase
}
