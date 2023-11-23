import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetProblemByLessonIdUseCase } from '@/use-cases/factories/problems/make.get.problem.by.lesson.id.use.case'

export async function getProblemByLessonIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProblemByLessonIdUseCase = makeGetProblemByLessonIdUseCase()

    const schema = z.object({
      lessonId: z.string(),
    })

    const { lessonId } = schema.parse(request.params)

    const { problem } = await getProblemByLessonIdUseCase.execute({
      lessonId,
    })

    reply.code(200).send({ problem })
  } catch (error) {
    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
