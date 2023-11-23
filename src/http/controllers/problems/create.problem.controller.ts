import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateProblemUseCase } from '@/use-cases/factories/problems/make.create.problem.use.case'

export async function createProblemController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createProblemUseCase = makeCreateProblemUseCase()

    const schema = z.object({
      title: z.string(),
      problemStatement: z.string(),
      examples: z.array(
        z.object({
          inputText: z.string(),
          outputText: z.string(),
          explanation: z.string(),
        }),
      ),
      constraints: z.string(),
      starterCode: z.string(),
      handlerFunction: z.string(),
      order: z.string(),
      starterFunctionName: z.string(),
      lessonId: z.string(),
    })

    const {
      title,
      problemStatement,
      examples,
      constraints,
      starterCode,
      handlerFunction,
      starterFunctionName,
      order,
      lessonId,
    } = schema.parse(request.body)

    const { problem } = await createProblemUseCase.execute({
      title,
      problemStatement,
      examples,
      constraints,
      starterCode,
      handlerFunction,
      starterFunctionName,
      order,
      lessonId,
    })

    reply.code(201).send(problem)
  } catch (error) {
    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
