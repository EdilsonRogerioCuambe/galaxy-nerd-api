import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorNotFoundError } from '@/use-cases/instructors/err/instructor.not.found.error'
import { makeDeleteInstructorUseCase } from '@/use-cases/factories/instructors/make.delete.instructor'

export async function deleteInstructorController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    instructorId: z.string().uuid(),
  })

  const { instructorId } = schema.parse(request.params)

  try {
    const deleteInstructorUseCase = makeDeleteInstructorUseCase()

    await deleteInstructorUseCase.execute({ instructorId })

    reply.status(204).send()
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500).send()
  }
}
