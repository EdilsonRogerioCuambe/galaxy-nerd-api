import { makeCreateQuizUseCase } from '@/use-cases/factories/quizzes/make.create.quiz.use.case'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function createQuizController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string(),
    lessonId: z.string(),
    answer: z.string(),
    points: z.number(),
    quizOptions: z.array(
      z.object({
        option: z.string(),
        isCorrect: z.boolean(),
      }),
    ),
  })

  const { title, description, lessonId, answer, points, quizOptions } =
    schema.parse(request.body)

  try {
    const createQuizUseCase = makeCreateQuizUseCase()

    const quiz = await createQuizUseCase.execute({
      title,
      description,
      lessonId,
      answer,
      points,
      quizOptions,
    })

    return reply.status(201).send({ quiz })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
