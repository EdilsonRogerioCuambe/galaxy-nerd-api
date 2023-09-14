import { makeGetAdminProfileUseCase } from '@/use-cases/factories/admins/make.get.admin.profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileAdminController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAdminProfileUseCase = makeGetAdminProfileUseCase()

  const { admin } = await getAdminProfileUseCase.execute({
    adminId: request.user.sub,
  })

  return reply.status(200).send({
    admin: {
      ...admin,
      password: undefined,
    },
  })
}
