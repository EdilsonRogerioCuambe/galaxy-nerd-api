import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetAllForumsByLessonIdUseCase } from '@/use-cases/factories/forums/make.forums.by.lesson.is.use.case'

export async function getAllForumsByLessonIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    lessonId: z.string(),
  })

  const { lessonId } = schema.parse(request.params)

  try {
    const getAllForumsByLessonIdUseCase = makeGetAllForumsByLessonIdUseCase()

    const forums = await getAllForumsByLessonIdUseCase.execute({ lessonId })

    return reply.status(200).send({ forums })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
