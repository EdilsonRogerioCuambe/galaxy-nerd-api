import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterTopicUseCase } from '@/use-cases/factories/topics/make.register.topic.use.case'
import { TopicAlreadyExistsError } from '@/use-cases/topics/err/topic.already.exists.error'

interface MultipartFile {
  path: string
}

export async function registerTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    order: z.string(),
    courseId: z.string().uuid(),
    description: z.string().optional(),
  })

  const { title, order, courseId, description } = schema.parse(request.body)

  const { path: icon } = request.file as unknown as MultipartFile

  try {
    const registerTopicUseCase = makeRegisterTopicUseCase()

    const topic = await registerTopicUseCase.execute({
      title,
      order,
      courseId,
      description,
      icon,
    })

    return reply.status(201).send({ topic })
  } catch (error) {
    if (error instanceof TopicAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
