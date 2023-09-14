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

    const token = await reply.jwtSign(
      {
        role: student.role,
      },
      {
        sign: {
          sub: student.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: student.role,
      },
      {
        sign: {
          sub: student.id,
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
        student: {
          ...student,
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
