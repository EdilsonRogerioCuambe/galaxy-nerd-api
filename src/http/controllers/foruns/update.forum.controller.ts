import { makeUpdateForumUseCase } from '@/use-cases/factories/forums/make.update.forum.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ForumNotFoundError } from '@/use-cases/foruns/error/forum.not.found.error'

export async function updateForumController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    id: z.string(),
    studentId: z.string(),
    lessonId: z.string(),
  })

  const { title, description, studentId, lessonId } = schema.parse(request.body)

  const { id } = request.params as {
    id: string
  }

  try {
    const updateForumUseCase = makeUpdateForumUseCase()

    const forum = await updateForumUseCase.execute({
      title,
      description,
      id,
      studentId,
      lessonId,
    })

    return reply.status(200).send({ forum })
  } catch (error) {
    if (error instanceof ForumNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
