import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetChildrenAnswersUseCase } from '@/use-cases/factories/answers/make.children.answers.use.case'

export async function getChildrenAnswersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  try {
    const getChildrenAnswersUseCase = makeGetChildrenAnswersUseCase()

    const answers = await getChildrenAnswersUseCase.execute({
      id,
    })

    return reply.status(200).send({ answers })
  } catch (error) {
    return reply.status(409).send({
      message: error,
    })
  }
}
