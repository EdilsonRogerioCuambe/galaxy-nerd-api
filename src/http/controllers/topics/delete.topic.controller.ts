import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteTopicUseCase } from '@/use-cases/factories/topics/make.delete.topic.use.case'
import { TopicNotFoundError } from '@/use-cases/topics/err/topic.not.found.error'

export async function deleteTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const deleteTopicUseCase = makeDeleteTopicUseCase()

  try {
    const { topic } = await deleteTopicUseCase.execute({ id })

    return reply.status(200).send({ topic })
  } catch (error) {
    if (error instanceof TopicNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
