import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllInstructorsUseCase } from '@/use-cases/factories/instructors/make.get.all.instructors.use.case'
import { InstructorNotFoundError } from '@/use-cases/instructors/err/instructor.not.found.error'

export async function getAllInstructors(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllInstructorsUseCase = makeGetAllInstructorsUseCase()

    const { instructors } = await getAllInstructorsUseCase.execute()

    return reply.status(200).send({
      instructors,
    })
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
