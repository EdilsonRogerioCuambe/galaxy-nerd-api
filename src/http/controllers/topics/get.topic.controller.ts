import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetTopicUseCase } from '@/use-cases/factories/topics/make.get.topic.use.case'
import { TopicNotFoundError } from '@/use-cases/topics/err/topic.not.found.error'

export async function getTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params) as { id: string }

  try {
    const getTopicUseCase = makeGetTopicUseCase()

    const { topic } = await getTopicUseCase.execute({ id })

    return reply.status(200).send({ topic })
  } catch (error) {
    if (error instanceof TopicNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }

  return reply.status(500).send()
}
