import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetStudentProfileUseCaseFactory } from '@/use-cases/factories/students/make.get.student.profile.use.case'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'

export async function getStudentProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    studentId: z.string(),
  })

  const { studentId } = schema.parse(request.params)

  try {
    const getStudentProfileUseCase = makeGetStudentProfileUseCaseFactory()

    const { student } = await getStudentProfileUseCase.execute({
      studentId,
    })

    reply.status(200).send({ student })
  } catch (err) {
    if (err instanceof StudentNotFoundError) {
      reply.status(404).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
