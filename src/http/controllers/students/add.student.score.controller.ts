import { makeAddStudentScoreUseCase } from '@/use-cases/factories/students/make.add.score.use.case'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function addStudentScoreController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    studentId: z.string(),
    quizId: z.string(),
    score: z.number(),
  })

  const { studentId, quizId, score } = bodySchema.parse(request.body)

  try {
    const addStudentScoreUseCase = makeAddStudentScoreUseCase()

    const { score: newScore } = await addStudentScoreUseCase.execute({
      studentId,
      quizId,
      score,
    })

    return reply.status(201).send({ score: newScore })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
