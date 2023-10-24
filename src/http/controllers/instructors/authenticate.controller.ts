import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/instructors/err/instructor.invalid.credentials'
import { makeAuthenticateInstructorUseCase } from '@/use-cases/factories/instructors/make.authenticate.instructor.use.case'
import { z } from 'zod'

export async function authenticateInstructorController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticateInstructorUseCase = makeAuthenticateInstructorUseCase()

    const { instructor } = await authenticateInstructorUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: instructor.role,
      },
      {
        sign: {
          sub: instructor.id,
          expiresIn: '7d',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: instructor.role,
      },
      {
        sign: {
          sub: instructor.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .send({
        instructor: {
          ...instructor,
          password: undefined,
        },
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(401).send({ message: err.message })
    } else {
      reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
