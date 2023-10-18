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

    const token = await reply.jwtSign(
      {
        role: admin.role,
      },
      {
        sign: {
          sub: admin.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: admin.role,
      },
      {
        sign: {
          sub: admin.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send({
        admin: {
          ...admin,
          password: undefined,
        },
        token,
      })
  } catch (err) {
    console.log(err)

    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
