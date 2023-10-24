import { makeCreateForumUseCase } from '@/use-cases/factories/forums/make.create.forum.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { LessonNotFoundError } from '@/use-cases/lessons/error/lesson.not.found'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'

export async function createForumController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    studentId: z.string(),
    lessonId: z.string(),
  })

  const { title, description } = schema.parse(request.body)

  const { studentId, lessonId } = request.params as {
    studentId: string
    lessonId: string
  }

  try {
    const createForumUseCase = makeCreateForumUseCase()

    const forum = await createForumUseCase.execute({
      title,
      description,
      studentId,
      lessonId,
    })

    return reply.status(201).send({ forum })
  } catch (error) {
    if (error instanceof LessonNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
