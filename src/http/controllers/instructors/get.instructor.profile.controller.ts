import { makeGetInstructorProfileUseCase } from '@/use-cases/factories/instructors/make.get.instructor.profile'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorNotFoundError } from '@/use-cases/instructors/err/instructor.not.found.error'

export async function getInstructorProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    instructorId: z.string(),
  })

  const { instructorId } = schema.parse(request.params)

  try {
    const getInstructorProfileUseCase = makeGetInstructorProfileUseCase()

    const { instructor } = await getInstructorProfileUseCase.execute({
      instructorId,
    })

    return reply.status(200).send({
      instructor,
    })
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
