import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { GetForumBySlugUseCase } from '@/use-cases/foruns/get.forum.by.slug.use.case'

export function makeGetForumBySlugUseCase() {
  const prismaForunsRepository = new PrismaForunsRepository()

  const getForumBySlugUseCase = new GetForumBySlugUseCase(
    prismaForunsRepository,
  )

  return getForumBySlugUseCase
}
