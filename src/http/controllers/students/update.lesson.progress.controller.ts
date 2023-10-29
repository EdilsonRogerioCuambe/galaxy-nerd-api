import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateLessonProgressUseCase } from '@/use-cases/factories/students/make.update.lesson.progress.use.case'

export async function updateLessonProgressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    lessonProgressId: z.string(),
    lessonId: z.string(),
    studentId: z.string(),
    watched: z.boolean(),
  })

  const { lessonId, studentId, watched, lessonProgressId } = bodySchema.parse(
    request.body,
  )

  try {
    const updateLessonProgressUseCase = makeUpdateLessonProgressUseCase()

    const { lessonProgress } = await updateLessonProgressUseCase.execute({
      lessonProgressId,
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
