import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetAnswersByForumIdUseCase } from '@/use-cases/factories/answers/make.get.answers.by.forum.id.use.case'

export async function getAnswersByForumIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    forumId: z.string(),
  })

  const { forumId } = schema.parse(request.params)

  try {
    const getAnswersByForumIdUseCase = makeGetAnswersByForumIdUseCase()

    const answers = await getAnswersByForumIdUseCase.execute({
      forumId,
    })

    return reply.status(200).send({ answers })
  } catch (error) {
    return reply.status(409).send({
      message: error,
    })
  }
}
