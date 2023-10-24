import { makeGetForumByIdUseCase } from '@/use-cases/factories/forums/make.get.forum.by.id.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ForumNotFoundError } from '@/use-cases/foruns/error/forum.not.found.error'

export async function getForumByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  try {
    const getForumByIdUseCase = makeGetForumByIdUseCase()

    const forum = await getForumByIdUseCase.execute({ id })

    return reply.status(200).send({ forum })
  } catch (error) {
    if (error instanceof ForumNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
