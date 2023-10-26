import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateAnswerUseCase } from '@/use-cases/factories/answers/make.create.answers.use.case'

export async function createAnswerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    content: z.string(),
    parentId: z.string().optional(),
    forumId: z.string(),
    studentId: z.string().optional(),
    instructorId: z.string().optional(),
  })

  const { content, parentId, studentId, forumId, instructorId } = schema.parse(
    request.body,
  )

  try {
    const createAnswerUseCase = makeCreateAnswerUseCase()

    const answer = await createAnswerUseCase.execute({
      content,
      parentId,
      forumId,
      studentId,
      instructorId,
    })

    return reply.status(201).send({ answer })
  } catch (error) {
    return reply.status(409).send({
      message: error,
    })
  }
}
