import { makeDeleteStudentUseCaseFactory } from '@/use-cases/factories/students/make.delete.student.use.case'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteStudentController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    studentId: z.string().uuid(),
  })

  const { studentId } = schema.parse(request.params)

  try {
    const deleteStudentUseCase = makeDeleteStudentUseCaseFactory()

    await deleteStudentUseCase.execute({ studentId })

    reply.status(204).send()
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500).send()
  }
}
