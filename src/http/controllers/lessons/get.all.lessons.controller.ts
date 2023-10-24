import { makeGetAllLessonsUseCase } from '@/use-cases/factories/lessons/make.get.all.lessons.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllLessonsController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllLessonsUseCase = makeGetAllLessonsUseCase()

    const lessons = await getAllLessonsUseCase.execute()

    reply.code(200).send(lessons)
  } catch (error) {
    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
