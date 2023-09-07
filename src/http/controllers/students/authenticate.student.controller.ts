import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/students/err/student.invalid.credentials.error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateStudentUseCase } from '@/use-cases/factories/students/make.authenticate.student.use.case'

export async function authenticateStudentController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticateStudentUseCase = makeAuthenticateStudentUseCase()

    const { student } = await authenticateStudentUseCase.execute({
      email,
      password,
    })

    reply.status(200).send({ student })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
