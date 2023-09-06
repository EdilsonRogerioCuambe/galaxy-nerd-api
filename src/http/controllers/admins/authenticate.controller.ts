import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateAdminUseCase } from '@/use-cases/factories/admins/make.authenticate.use.case'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/admins/err/admin.invalid.credentials'

export async function authenticateAdminController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticateAdminUseCase = makeAuthenticateAdminUseCase()

    const { admin } = await authenticateAdminUseCase.execute({
      email,
      password,
    })

    reply.status(200).send({ admin })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
