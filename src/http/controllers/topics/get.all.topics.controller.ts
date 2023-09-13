import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetAllTopicsUseCase } from '@/use-cases/factories/topics/make.get.all.topics.use.case'

export async function getAllTopicsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({})

  schema.parse(request.params)

  const getAllTopicsUseCase = makeGetAllTopicsUseCase()

  const { topics } = await getAllTopicsUseCase.execute()

  return reply.status(200).send({ topics })
}
