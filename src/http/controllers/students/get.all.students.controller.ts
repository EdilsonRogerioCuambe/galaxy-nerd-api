import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllStudentsUseCaseFactory } from '@/use-cases/factories/students/make.get.all.students.use.case'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'

export async function getAllStudentsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllStudentsUseCase = makeGetAllStudentsUseCaseFactory()

    const { students } = await getAllStudentsUseCase.execute()

    reply.status(200).send({ students })
  } catch (err) {
    if (err instanceof StudentNotFoundError) {
      reply.status(404).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
