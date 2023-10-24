import { makeDeleteForumUseCase } from '@/use-cases/factories/forums/make.delete.forum.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ForumNotFoundError } from '@/use-cases/foruns/error/forum.not.found.error'

export async function deleteForumController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  try {
    const deleteForumUseCase = makeDeleteForumUseCase()

    await deleteForumUseCase.execute({ id })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ForumNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
