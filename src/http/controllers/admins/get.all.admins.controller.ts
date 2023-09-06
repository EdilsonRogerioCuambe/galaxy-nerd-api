import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllAdminsUseCase } from '@/use-cases/factories/admins/make.get.admins.use.case'
import { AdminNotFoundError } from '@/use-cases/admins/err/admin.not.found.error'

export async function getAllAdmins(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllAdminsUseCase = makeGetAllAdminsUseCase()

    const { admins } = await getAllAdminsUseCase.execute()

    return reply.status(200).send({
      admins,
    })
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
