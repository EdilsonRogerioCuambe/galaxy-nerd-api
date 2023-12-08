import { OAuth2Client } from 'google-auth-library'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'
import { makeGetInstructorByEmailUseCase } from '@/use-cases/factories/instructors/make.get.instructor.by.email.use.case'
import { makeUpdateInstructorUseCase } from '@/use-cases/factories/instructors/make.update.instructor.use.case'

const oauth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage',
)

export async function authenticateInstructorUsingGoogleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    code: z.string(),
  })

  const { code } = bodySchema.parse(request.body)

  const { tokens } = await oauth2Client.getToken(code)

  const ticket = await oauth2Client.verifyIdToken({
    audience: env.GOOGLE_CLIENT_ID,
    idToken: tokens.id_token as string,
  })

  const payload = ticket.getPayload()

  if (!payload) {
    return reply.status(400).send({
      message: 'Invalid token',
    })
  }

  const { email, name, picture } = payload

  const getInstuctorByEmailUseCase = makeGetInstructorByEmailUseCase()
  const updateInstuctorUseCase = makeUpdateInstructorUseCase()

  try {
    const { instructor } = await getInstuctorByEmailUseCase.execute({
      email: email as string,
    })

    if (!instructor.name || !instructor.avatar) {
      await updateInstuctorUseCase.execute({
        instructorId: instructor.id,
        name: name as string,
        avatar: picture as string,
      })

      instructor.name = name as string
      instructor.avatar = picture as string
    } else {
      await updateInstuctorUseCase.execute({
        instructorId: instructor.id,
        name: name as string,
        avatar: picture as string,
      })
    }

    const token = await reply.jwtSign(
      {
        role: instructor.role,
      },
      {
        sign: {
          sub: instructor.id,
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

    const googleToken = tokens.access_token

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .send({
        token,
        instructor,
        googleToken,
      })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }
}
