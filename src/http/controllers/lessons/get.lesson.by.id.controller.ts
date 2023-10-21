import { FastifyRequest, FastifyReply } from 'fastify'
import { LessonNotFoundError } from '@/use-cases/lessons/error/lesson.not.found'
import { makeGetLessonByIdUseCase } from '@/use-cases/factories/lessons/make.get.lesson.by.id.use.case'
import { z } from 'zod'

export async function getLessonByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    lessonId: z.string(),
  })

  const { lessonId } = schema.parse(request.params)

  try {
    const getLessonByIdUseCase = makeGetLessonByIdUseCase()

    const lesson = await getLessonByIdUseCase.execute({ id: lessonId })

    reply.code(200).send({
      lesson,
    })
  } catch (error) {
    if (error instanceof LessonNotFoundError) {
      reply.code(404).send({ message: error.message })
    }

    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
