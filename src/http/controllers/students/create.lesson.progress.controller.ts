import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateLessonProgressUseCase } from '@/use-cases/factories/students/make.create.lesson.progress.use.case'

export async function createLessonProgressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    lessonId: z.string(),
    studentId: z.string(),
    watched: z.boolean(),
  })

  const { lessonId, studentId, watched } = bodySchema.parse(request.body)

  try {
    const createLessonProgressUseCase = makeCreateLessonProgressUseCase()

    const { lessonProgress } = await createLessonProgressUseCase.execute({
      lessonId,
      studentId,
      watched,
    })

    return reply.status(201).send({
      lessonProgress,
    })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error',
    })
  }
}
