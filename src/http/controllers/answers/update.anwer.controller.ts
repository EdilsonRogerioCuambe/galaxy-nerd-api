import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUpdateAnswerUseCase } from '@/use-cases/factories/answers/make.update.answer.use.case'

export async function updateAnswerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
    content: z.string().optional(),
    upvotes: z.number().optional(),
    downvotes: z.number().optional(),
  })

  const { content, upvotes, downvotes } = schema.parse(request.body)

  const { id } = request.params as { id: string }

  try {
    const updateAnswerUseCase = makeUpdateAnswerUseCase()

    const answer = await updateAnswerUseCase.execute({
      id,
      content,
      upvotes,
      downvotes,
    })

    return reply.status(200).send({ answer })
  } catch (error) {
    return reply.status(409).send({
      message: error,
    })
  }
}
