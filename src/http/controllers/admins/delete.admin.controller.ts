import { makeDeleteAdminUseCase } from '@/use-cases/factories/admins/make.delete.admin.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminNotFoundError } from '@/use-cases/admins/err/admin.not.found.error'

export async function deleteAdminController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    adminId: z.string().uuid(),
  })

  const { adminId } = schema.parse(request.params)

  try {
    const deleteAdminUseCase = makeDeleteAdminUseCase()

    await deleteAdminUseCase.execute({ adminId })

    reply.status(204).send()
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500).send()
  }
}
