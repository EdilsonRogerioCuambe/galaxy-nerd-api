import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { CreateForumUseCase } from '@/use-cases/foruns/create.forum.use.case'

export function makeCreateForumUseCase() {
  const prismaForunsRepository = new PrismaForunsRepository()

  const createForumUseCase = new CreateForumUseCase(prismaForunsRepository)

  return createForumUseCase
}
