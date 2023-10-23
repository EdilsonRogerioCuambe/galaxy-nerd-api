import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { UpdateForumUseCase } from '@/use-cases/foruns/update.forum.use.case'

export function makeUpdateForumUseCase() {
  const prismaForunsRepository = new PrismaForunsRepository()

  const updateForumUseCase = new UpdateForumUseCase(prismaForunsRepository)

  return updateForumUseCase
}
