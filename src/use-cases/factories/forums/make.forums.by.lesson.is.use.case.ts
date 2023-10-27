import { PrismaForunsRepository } from '@/repositories/prisma-repositories/prisma.forum.repositories'
import { GetAllForumsByLessonIdUseCase } from '@/use-cases/foruns/get.all.forums.by.lesson.id.use.case'

export const makeGetAllForumsByLessonIdUseCase = () => {
  const prismaForunsRepository = new PrismaForunsRepository()

  const getAllForumsByLessonIdUseCase = new GetAllForumsByLessonIdUseCase(
    prismaForunsRepository,
  )

  return getAllForumsByLessonIdUseCase
}
