import { makeGetLessonBySlugUseCase } from '@/use-cases/factories/lessons/make.get.lesson.by.slug.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { LessonNotFoundError } from '@/use-cases/lessons/error/lesson.not.found'
import { z } from 'zod'

export async function getLessonBySlugController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    slug: z.string(),
  })

  const { slug } = schema.parse(request.params)

  try {
    const getLessonBySlugUseCase = makeGetLessonBySlugUseCase()

    const lesson = await getLessonBySlugUseCase.execute({ slug })

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
