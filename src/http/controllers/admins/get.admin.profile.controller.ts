import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminNotFoundError } from '@/use-cases/admins/err/admin.not.found.error'
import { makeGetAdminProfileUseCase } from '@/use-cases/factories/admins/make.get.admin.profile'

export async function getAdminProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    adminId: z.string(),
  })

  const { adminId } = schema.parse(request.params)

  try {
    const getAdminProfileUseCase = makeGetAdminProfileUseCase()

    const response = await getAdminProfileUseCase.execute({
      adminId,
    })

    return reply.status(200).send({
      admin: response.admin,
    })
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
