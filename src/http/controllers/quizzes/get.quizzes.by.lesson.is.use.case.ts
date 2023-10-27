import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetQuizzesByLessonIdUseCase } from '@/use-cases/factories/quizzes/make.get.quizzes.by.lesson.id.use.case'

export async function getQuizzesByLessonIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    lessonId: z.string(),
  })

  const { lessonId } = schema.parse(request.params)

  try {
    const getQuizzesByLessonIdUseCase = makeGetQuizzesByLessonIdUseCase()

    const { quizzes } = await getQuizzesByLessonIdUseCase.execute({
      lessonId,
    })

    return reply.status(200).send({ quizzes })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
