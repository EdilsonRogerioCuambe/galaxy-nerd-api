import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDownvoteAnswerUseCase } from '@/use-cases/factories/votes/make.downvote.use.case'

export async function downvoteAnswerController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const schema = z.object({
    id: z.string(),
    studentId: z.string().optional(),
    instructorId: z.string().optional(),
  })

  const { studentId, instructorId } = schema.parse(request.body)

  const { id } = schema.parse(request.params)

  const downvoteAnswerUseCase = makeDownvoteAnswerUseCase()

  try {
    const answer = await downvoteAnswerUseCase.execute({
      id,
      studentId,
      instructorId,
    })

    reply.code(200).send({ answer })
  } catch (error) {
    reply.code(500).send(error)
  }
}
