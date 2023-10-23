import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { DeleteForumUseCase } from '@/use-cases/foruns/delete.forum.use.case'

export function makeDeleteForumUseCase() {
  const prismaForunsRepository = new PrismaForunsRepository()

  const deleteForumUseCase = new DeleteForumUseCase(prismaForunsRepository)

  return deleteForumUseCase
}
