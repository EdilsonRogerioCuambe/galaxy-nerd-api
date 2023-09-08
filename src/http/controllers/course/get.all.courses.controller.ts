import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllCoursesUseCase } from '@/use-cases/factories/courses/make.get.all.courses.use.case'

export async function getAllCoursesController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCoursesUseCase = makeGetAllCoursesUseCase()

    const response = await getAllCoursesUseCase.execute()

    return reply.status(200).send(response)
  } catch (error) {
    return reply.status(500).send()
  }
}
