import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpvoteAnswerUseCase } from '@/use-cases/factories/votes/make.upvote.answer.use.case'

export async function upvoteAnswerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
    studentId: z.string().optional(),
    instructorId: z.string().optional(),
  })

  const { studentId, instructorId } = schema.parse(request.body)

  const { id } = schema.parse(request.params)

  const upvoteAnswerUseCase = makeUpvoteAnswerUseCase()

  try {
    const answer = await upvoteAnswerUseCase.execute({
      id,
      studentId,
      instructorId,
    })

    reply.code(200).send({ answer })
  } catch (error) {
    reply.code(500).send(error)
  }
}
