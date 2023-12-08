import { OAuth2Client } from 'google-auth-library'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'
import { makeGetAdminByEmailUseCase } from '@/use-cases/factories/admins/make.get.admin.by.email.use.case'
import { makeUpdateAdminUseCase } from '@/use-cases/factories/admins/make.update.admin.use.case'

const oauth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage',
)

export async function authenticateAdminUsingGoogleController(
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

  const getAdminByEmailUseCase = makeGetAdminByEmailUseCase()
  const updateAdminUseCase = makeUpdateAdminUseCase()

  try {
    const { admin } = await getAdminByEmailUseCase.execute({
      email: email as string,
    })

    if (!admin.name || !admin.avatar) {
      await updateAdminUseCase.execute({
        adminId: admin.id,
        name: name as string,
        avatar: picture as string,
      })

      admin.name = name as string
      admin.avatar = picture as string
    } else {
      await updateAdminUseCase.execute({
        adminId: admin.id,
        name: admin.name,
        avatar: admin.avatar,
      })
    }

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
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }
}
