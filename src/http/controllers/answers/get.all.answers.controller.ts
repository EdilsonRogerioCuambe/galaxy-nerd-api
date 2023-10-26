import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllAnswersUseCase } from '@/use-cases/factories/answers/make.get.all.answers.use.case'

export async function getAllAnswersController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllAnswersUseCase = makeGetAllAnswersUseCase()

    const answers = await getAllAnswersUseCase.execute()

    return reply.status(200).send({ answers })
  } catch (error) {
    return reply.status(409).send({
      message: error,
    })
  }
}
